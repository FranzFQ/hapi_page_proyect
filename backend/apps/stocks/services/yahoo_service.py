from yahooquery import Ticker
from django.utils import timezone
from apps.stocks.models import Stock, StockPrice

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


def update_all_stocks():
    
    print("Iniciando actualización de precios...")

    stocks = Stock.objects.filter(is_active=True)
    updated = 0

    for stock in stocks:
        price = fetch_price(stock.symbol)
        if price is None:
            print(f"Error al obtener precio de {stock.symbol}")
            continue

        # Calcula variación
        variation = float(price) - float(stock.last_price or 0)

        # Actualiza Stock
        stock.last_price = price
        stock.variation = variation
        stock.update_at = timezone.now()
        stock.save()

        # Registra StockPrice
        StockPrice.objects.create(
            stock=stock,
            price=price,
            recorded_at=timezone.now()
        )

        print(f"{stock.symbol}: actualizado a {price}")
        updated += 1

    print(f"\nActualización completada: {updated} acciones actualizadas.")
