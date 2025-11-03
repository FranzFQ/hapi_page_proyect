from yahooquery import Ticker
from django.utils import timezone
from datetime import datetime, date, timedelta
from django.conf import settings
import finnhub
from apps.stocks.models import Stock, StockPrice, NewsArticle
from dateutil import parser 
import re 
import time 
from googletrans import Translator

def fetch_price(symbol: str):
    try:
        ticker = Ticker(symbol)
        price_data = ticker.price
        info = price_data.get(symbol)
        if not info:
            print(f"No se encontro informacion para {symbol}")
            return None
        return info.get("regularMarketPrice")
    except Exception as e:
        print(f"Error obteniendo {symbol}: {e}")
        return None

def fetch_and_save_news_for_stock(stock_obj):
    
    API_KEY = getattr(settings, 'FINNHUB_API_KEY', None)
    if not API_KEY or API_KEY == 'TU_API_KEY_DE_FINNHUB':
        print(f"Error: FINNHUB_API_KEY no encontrada o no configurada en settings.py para {stock_obj.symbol}")
        return 0

    try:
        finnhub_client = finnhub.Client(api_key=API_KEY)
        translator = Translator()
        
        today = date.today()
        one_week_ago = today - timedelta(days=7)
        start_date_str = one_week_ago.strftime("%Y-%m-%d")
        end_date_str = today.strftime("%Y-%m-%d")

        news_list = finnhub_client.company_news(stock_obj.symbol, _from=start_date_str, to=end_date_str)
        
        if not news_list:
            print(f"No se encontraron noticias para {stock_obj.symbol}")
            return 0
        
        NewsArticle.objects.filter(stock=stock_obj).delete()
        
        saved_count = 0
        for item in news_list[:5]:
            url = item.get('url')
            original_title = item.get('headline')
            source = item.get('source')
            published_time_timestamp = item.get('datetime')

            if not all([url, original_title, source, published_time_timestamp]):
                continue

            if NewsArticle.objects.filter(url=url, stock=stock_obj).exists():
                continue

            try:
                translated_title = translator.translate(original_title, dest='es').text
                time.sleep(0.5) 

                published_dt = timezone.make_aware(datetime.fromtimestamp(published_time_timestamp))
                
                NewsArticle.objects.create(
                    stock=stock_obj,
                    title=translated_title,
                    source=source,
                    url=url,
                    published_at=published_dt
                )
                saved_count += 1
            except Exception as e:
                print(f"Error guardando o traduciendo noticia '{original_title}': {e}")
                
        if saved_count > 0:
            print(f"Guardadas {saved_count} noticias nuevas (traducidas) para {stock_obj.symbol}")
        return saved_count
        
    except Exception as e:
        print(f"Error crítico obteniendo noticias para {stock_obj.symbol}: {e}")
        return 0


def update_all_stock_prices():
    print("Iniciando actualización de PRECIOS...")

    stocks = Stock.objects.filter(is_active=True)
    updated_prices = 0

    for stock in stocks:
        price = fetch_price(stock.symbol)
        if price is None:
            print(f"Error al obtener precio de {stock.symbol}")
            continue

        variation = float(price) - float(stock.last_price or 0)
        stock.last_price = price
        stock.variation = variation
        stock.update_at = timezone.now()
        stock.save()

        StockPrice.objects.create(
            stock=stock,
            price=price,
            recorded_at=timezone.now()
        )
        
        print(f"Precio de {stock.symbol} actualizado a {price}")
        updated_prices += 1

    print(f"\nActualización de precios completada: {updated_prices} precios actualizados.")


def update_all_stock_news():
    print("Iniciando actualización de NOTICIAS...")
    
    stocks = Stock.objects.filter(is_active=True)
    updated_news_total = 0
    
    for stock in stocks:
        print(f"Buscando noticias para {stock.symbol}...")
        
        time.sleep(1) 
        
        updated_news_total += fetch_and_save_news_for_stock(stock)

    print(f"\nActualización de noticias completada: {updated_news_total} noticias nuevas guardadas.")