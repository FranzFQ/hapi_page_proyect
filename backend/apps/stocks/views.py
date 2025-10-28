from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Stock, Category
from .serializers import StockSerializer, CategorySerializer
from .services.yahoo_service import update_stock_price

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all().order_by('symbol')
    serializer_class = StockSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'symbol', 'category__name']

    @action(detail=True, methods=['post'])
    def refresh_price(self, request, pk=None):
        stock = self.get_object()
        updated = update_stock_price(stock.symbol)
        if updated:
            return Response({"status": "updated"}, status=status.HTTP_200_OK)
        return Response({"error": "No se pudo actualizar el precio"}, status=status.HTTP_400_BAD_REQUEST)
