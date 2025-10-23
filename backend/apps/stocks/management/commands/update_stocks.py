from django.core.management.base import BaseCommand
from apps.stocks.services.yahoo_service import update_all_stocks

class Command(BaseCommand):
    help = "Actualiza los precios de todas las acciones desde Yahoo Finance (usando yahooquery)."

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Iniciando actualizacion de precios..."))
        update_all_stocks()
        self.stdout.write(self.style.SUCCESS("Actualización completada"))
