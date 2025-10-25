from django.contrib import admin
from .models import Stock, StockCategory, StockPrice

admin.site.register(Stock)
admin.site.register(StockCategory)
admin.site.register(StockPrice)