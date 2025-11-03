from django.core.management.base import BaseCommand
from apps.stocks.services.yahoo_service import update_all_stock_news

class Command(BaseCommand):
    help = "Actualiza NOTICIAS de acciones desde Finnhub."

    def handle(self, *args, **kwargs):
        update_all_stock_news()