import yfinance as yf
from datetime import datetime, timedelta
from ..models import Stock, StockPrice

def update_stock_price(symbol: str):

    #Descarga el precio más reciente de una acción desde Yahoo Finance y actualiza la base de datos.
    
    stock = yf.Ticker(symbol)
    hist = stock.history(period="5d")  # últimos 5 días

    if not hist.empty:
        last_row = hist.iloc[-1]
        price = last_row["Close"]
        date = last_row.name.date()

        stock_obj, _ = Stock.objects.get_or_create(symbol=symbol)
        stock_obj.current_price = price
        stock_obj.last_updated = datetime.now()
        stock_obj.save()

        StockPrice.objects.update_or_create(
            stock=stock_obj,
            date=date,
            defaults={"close_price": price},
        )
        return True
    return False
