from rest_framework import serializers
from .models import Stock, StockCategory, StockPrice, NewsArticle

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StockCategory
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


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'stock', 'title', 'source', 'url', 'published_at']