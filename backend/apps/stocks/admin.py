from django.contrib import admin
from .models import Stock, Category, StockPrice
from .services.yahoo_service import update_stock_price

@admin.action(description="Actualizar precio desde Yahoo Finance")
def refresh_selected_prices(modeladmin, request, queryset):
    for stock in queryset:
        stock.update_price()

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'current_price', 'last_updated')
    actions = [refresh_selected_prices]

