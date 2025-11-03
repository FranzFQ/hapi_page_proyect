from rest_framework import viewsets, filters, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Stock, StockCategory, NewsArticle, StockPrice
from django.utils import timezone
from .serializers import StockSerializer, CategorySerializer, NewsArticleSerializer
from .services.yahoo_service import fetch_price
from apps.stocks.services.search_service import search_all

@api_view(["GET"])
def search_view(request):
    query = request.GET.get("q", "")
    results = search_all(query)
    return Response(results)


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all().order_by('symbol')
    serializer_class = StockSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'symbol', 'category__name']

    @action(detail=True, methods=['post'])
    def refresh_price(self, request, pk=None):
        stock = self.get_object()
        price = fetch_price(stock.symbol) 
        if price:
            stock.last_price = price
            stock.variation = float(price) - float(stock.last_price or 0)
            stock.update_at = timezone.now()
            stock.save()
            StockPrice.objects.create(
                stock=stock,
                price=price,
                recorded_at=timezone.now()
            )
            return Response({"status": "updated", "price": price}, status=status.HTTP_200_OK)
        return Response({"error": "No se pudo actualizar el precio"}, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = StockCategory.objects.all().order_by('name')
    serializer_class = CategorySerializer

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.filter(is_active=True)
    serializer_class = NewsArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['stock__symbol']
    search_fields = ['title']