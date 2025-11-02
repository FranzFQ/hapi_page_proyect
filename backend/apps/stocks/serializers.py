from rest_framework import serializers
from .models import Stock, Category, StockPrice

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = ['date', 'close_price']


class StockSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    prices = StockPriceSerializer(many=True, read_only=True)

    class Meta:
        model = Stock
        fields = ['id', 'symbol', 'name', 'last_price', 'variation', 'updated_at', 'created_at', 'is_active', 'stock_category_id']

