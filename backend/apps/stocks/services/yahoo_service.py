from yahooquery import Ticker
from datetime import datetime

def update_stock_price(symbol: str) -> bool:
    from ..models import Stock, StockPrice  

    #Descarga el precio más reciente de una acción desde Yahoo Finance y actualiza la base de datos.
    
    try:
        ticker = Ticker(symbol)
        data = ticker.history(period="5d")  # últimos 5 días

        # yahooquery devuelve un DataFrame MultiIndex
        if data is None or data.empty:
            print(f"No se encontraron datos para {symbol}")
            return False

        # Tomar el último valor (más reciente)
        last_row = data.tail(1)
        close_price = float(last_row['close'].iloc[0])
        date = last_row.index.get_level_values('date')[0].date()

        # Actualizar o crear Stock
        stock_obj, _ = Stock.objects.get_or_create(symbol=symbol)
        stock_obj.current_price = close_price
        stock_obj.last_updated = datetime.now()
        stock_obj.save()

        # Registrar precio histórico
        StockPrice.objects.update_or_create(
            stock=stock_obj,
            date=date,
            defaults={'close_price': close_price}
        )

        print(f"Actualizado {symbol}: {close_price}")
        return True

    except Exception as e:
        print(f"Error actualizando {symbol}: {e}")
        return False

def update_all_stocks():
    
    #Recorre todos los registros de Stock y actualiza su precio usando Yahoo Finance (yahooquery).
    
    from ..models import Stock  # import dentro para evitar dependencias circulares
    stocks = Stock.objects.all()
    for stock in stocks:
        updated = update_stock_price(stock.symbol)
        if updated:
            print(f"{stock.symbol} actualizado correctamente.")
        else:
            print(f"Error al actualizar {stock.symbol}.") 
