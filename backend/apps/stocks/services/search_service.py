from apps.stocks.models import Stock
from apps.lists.models import ListItem

def search_all(query):
    results = {
        "stocks": [],
        "lists": []
    }

    if not query:
        return results

    # Buscar en stocks
    stock_results = Stock.objects.filter(
        name__icontains=query
    ) | Stock.objects.filter(symbol__icontains=query)

    # Buscar en listas
    list_results = ListItem.objects.filter(
        title__icontains=query
    )

    results["stocks"] = [
        {"id": s.id, "symbol": s.symbol, "name": s.name, "price": s.last_price}
        for s in stock_results
    ]

    results["lists"] = [
        {"id": l.id, "title": l.title, "user_id": l.user.id}
        for l in list_results
    ]

    return results
