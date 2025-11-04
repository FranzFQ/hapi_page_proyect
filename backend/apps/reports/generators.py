import csv
import io
from django.template.loader import render_to_string
from weasyprint import HTML
from apps.transactions.models import Transaction, TransactionDetail 

def generate_report_content(report):
    
    transaction_details = TransactionDetail.objects.filter(
        transaction__client_profile=report.client_profile,
        transaction__created_at__date__range=[report.start_date, report.end_date]
    ).order_by('transaction__created_at').select_related('stock', 'transaction')

    context = {
        'report': report,
        'user': report.client_profile.user,
        'transaction_details': transaction_details,
        'total_transactions': transaction_details.count(),
    }

    if report.file_format == 'PDF':
        return generate_pdf_from_html(context)
    elif report.file_format == 'CSV':
        return generate_csv(context)

def generate_csv(context):
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Fecha', 'Tipo', 'Activo (Símbolo)', 'Cantidad', 'Precio Unitario', 'Monto Total'])
    
    for detail in context['transaction_details']:
        writer.writerow([
            detail.transaction.created_at.strftime('%Y-%m-%d %H:%M'),
            detail.transaction.type,
            detail.stock.symbol,
            detail.quantity,
            detail.unit_price,
            detail.quantity * detail.unit_price
        ])
    
    return output.getvalue().encode('utf-8')

def generate_pdf_from_html(context):
    html_string = render_to_string('reports_templates.html', context)
    pdf_file = HTML(string=html_string).write_pdf()
    return pdf_file