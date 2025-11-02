from rest_framework import serializers
from .models import Stock, StockCategory, StockPrice

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StockCategory
        fields = '__all__'


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = ['date', 'close_price']


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'last_price', 'variation', 'created_at', 'is_active', 'stock_category_id']

