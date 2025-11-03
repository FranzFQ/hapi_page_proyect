import csv
import io
from django.template.loader import render_to_string
from weasyprint import HTML
from apps.transactions.models import Transaction 

def generate_report_content(report):
    transactions = Transaction.objects.filter(
        client_profile=report.client_profile,
        created_at__date__range=[report.start_date, report.end_date]
    ).order_by('created_at')

    context = {
        'report': report,
        'user': report.client_profile.user,
        'transactions': transactions,
        'total_transactions': transactions.count(),
    }

    if report.file_format == 'PDF':
        return generate_pdf_from_html(context)
    elif report.file_format == 'CSV':
        return generate_csv(context)

def generate_csv(context):
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Fecha', 'Tipo', 'Activo (Símbolo)', 'Cantidad', 'Precio', 'Monto Total'])
    
    for tx in context['transactions']:
        writer.writerow([
            tx.created_at.strftime('%Y-%m-%d %H:%M'),
            tx.type,
            tx.stock.symbol,
            tx.quantity,
            tx.price,
            tx.amount
        ])
    
    return output.getvalue().encode('utf-8')

def generate_pdf_from_html(context):
    html_string = render_to_string('reports/report_template.html', context)
    pdf_file = HTML(string=html_string).write_pdf()
    return pdf_file