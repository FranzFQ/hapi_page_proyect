# apps/reports/models.py
from django.db import models
from apps.users.models import ClientProfile

class Report(models.Model):
    class ReportStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pendiente'
        PROCESSING = 'PROCESSING', 'Procesando'
        COMPLETED = 'COMPLETED', 'Completado'
        FAILED = 'FAILED', 'Fallido'

    class ReportFormat(models.TextChoices):
        PDF = 'PDF', 'PDF'
        CSV = 'CSV', 'CSV'

    # Campos que ya tenías
    report_type = models.CharField(max_length=50, blank=True, null=True) # Renombrado de 'type'
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    file_content = models.BinaryField(blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    client_profile = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, related_name='reports')

    # Campos nuevos que añadimos con el SQL
    status = models.CharField(max_length=20, choices=ReportStatus.choices, default=ReportStatus.PENDING)
    file_format = models.CharField(max_length=10, choices=ReportFormat.choices, default=ReportFormat.PDF)

    class Meta:
        db_table = 'report'  # <--- ¡LA LÍNEA MÁGICA!
        managed = True # Dejamos que Django la maneje (o la quitamos, es 'True' por defecto)

    def __str__(self):
        return f"Reporte {self.report_type} para {self.client_profile.user.email}"