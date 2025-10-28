from django.core.management.base import BaseCommand
from apps.stocks.services.yahoo_service import update_all_stocks

class Command(BaseCommand):
    help = "Actualiza precios de acciones desde Yahoo Finance y guarda el historial."

    def handle(self, *args, **kwargs):
        update_all_stocks()
