from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Report, ClientProfile
from .serializer import ReportSerializer
from .tasks import process_report_generation

@method_decorator(csrf_exempt, name='dispatch')
class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            client_profile = ClientProfile.objects.get(user=self.request.user)
            return Report.objects.filter(client_profile=client_profile)
        except ClientProfile.DoesNotExist:
            return Report.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            client_profile = ClientProfile.objects.get(user=request.user)
        except ClientProfile.DoesNotExist:
            return Response(
                {"error": "Perfil de cliente no encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        report = serializer.save(client_profile=client_profile)
        
        process_report_generation.delay(report.id)
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Solicitud recibida. Recibirás tu reporte por correo en unos minutos.", "data": serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )