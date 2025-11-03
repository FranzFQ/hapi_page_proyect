from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Report
from apps.users.models import ClientProfile, User
from .serializer import ReportSerializer
from .tasks import process_report_generation

@method_decorator(csrf_exempt, name='dispatch')
class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [AllowAny]  # Permite acceso sin login
    queryset = Report.objects.all() 

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Para testing: usa el usuario zewier2.0@gmail.com (correo real)
        try:
            user = User.objects.get(email='zewier2.0@gmail.com')
            client_profile = ClientProfile.objects.get(user=user)
            if not client_profile:
                return Response(
                    {"error": "No se encontró el perfil del cliente."}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"error": f"Error al buscar perfil: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
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