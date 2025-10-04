from django.db import models


class StockCategory(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock_category'


class Stock(models.Model):
    symbol = models.CharField(max_length=20, blank=True, null=True)
    name = models.CharField(max_length=120, blank=True, null=True)
    last_price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    variation = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    update_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    stock_category = models.ForeignKey(StockCategory, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stock'


class StockPrice(models.Model):
    price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    recorded_at = models.DateTimeField(blank=True, null=True)
    stock = models.ForeignKey(Stock, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stock_price'