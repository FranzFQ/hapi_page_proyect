from celery import shared_task
from django.core.mail import EmailMessage
from django.conf import settings
from .models import Report
from .generators import generate_report_content

@shared_task
def process_report_generation(report_id):
    try:
        report = Report.objects.get(id=report_id)
        report.status = Report.ReportStatus.PROCESSING
        report.save()

        file_content = generate_report_content(report)
        
        report.file_content = file_content
        report.status = Report.ReportStatus.COMPLETED
        report.save()

        user_email = report.client_profile.user.email
        subject = f"Tu reporte de {report.report_type} está listo"
        body = (
            f"Hola {report.client_profile.user.first_name or ''},\n\n"
            f"Tu reporte de {report.report_type} para el periodo "
            f"{report.start_date} al {report.end_date} ha sido generado.\n\n"
            "Lo encontrarás adjunto en este correo.\n\n"
            "Gracias."
        )

        email = EmailMessage(
            subject,
            body,
            settings.DEFAULT_FROM_EMAIL,
            [user_email]
        )

        filename = f"reporte_{report.report_type}_{report.id}.{report.file_format.lower()}"
        content_type = 'application/pdf' if report.file_format == 'PDF' else 'text/csv'
        
        email.attach(filename, file_content, content_type)
        email.send()

    except Report.DoesNotExist:
        print(f"Error: Reporte ID {report_id} no encontrado.")
    except Exception as e:
        print(f"Error al procesar reporte {report_id}: {e}")
        if 'report' in locals():
            report.status = Report.ReportStatus.FAILED
            report.save()