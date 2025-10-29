from django.contrib import admin
from .models import Stock, StockCategory, StockPrice


@admin.register(StockCategory)
class StockCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    search_fields = ('name',)


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'last_price', 'update_at', 'is_active')
    list_filter = ('is_active', 'stock_category')
    search_fields = ('symbol', 'name')


@admin.register(StockPrice)
class StockPriceAdmin(admin.ModelAdmin):
    list_display = ('stock', 'price', 'recorded_at')
    list_filter = ('stock',)
    search_fields = ('stock__symbol',)
