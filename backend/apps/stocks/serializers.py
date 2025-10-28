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
        fields = ['id', 'symbol', 'name', 'category', 'current_price', 'last_updated', 'prices']

