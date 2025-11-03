from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Report, ClientProfile
from .serializer import ReportSerializer
from .tasks import process_report_generation

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [AllowAny]
    queryset = Report.objects.all() 

    def get_queryset(self):
        return Report.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        client_id = request.data.get('client_id')
        if not client_id:
            return Response(
                {"error": "client_id no proporcionado."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            client_profile = ClientProfile.objects.get(id=client_id)
        except ClientProfile.DoesNotExist:
            return Response(
                {"error": "Perfil de cliente no encontrado."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        report = serializer.save(client_profile=client_profile)
        
        process_report_generation.delay(report.id)
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "message": "Solicitud recibida. Recibirás tu reporte por correo en unos minutos.", 
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )