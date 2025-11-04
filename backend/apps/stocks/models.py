from django.db import models
from datetime import datetime


class StockCategory(models.Model):
    name = models.CharField(max_length=120, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "stock_category"  

    def __str__(self):
        return self.name


class Stock(models.Model):
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=120)
    last_price = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    variation = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    update_at = models.DateTimeField(null=True, blank=True, db_column="update_at")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    stock_category = models.ForeignKey(
        StockCategory, on_delete=models.SET_NULL, null=True, db_column="stock_category_id"
    )

    class Meta:
        db_table = "stock"

    def __str__(self):
        return f"{self.symbol} - {self.name}"


class StockPrice(models.Model):
    stock = models.ForeignKey(
        Stock, on_delete=models.CASCADE, related_name="prices", db_column="stock_id"
    )
    price = models.DecimalField(max_digits=15, decimal_places=2)
    recorded_at = models.DateTimeField(default=datetime.now)

    class Meta:
        db_table = "stock_price"
        ordering = ["-recorded_at"]

    def __str__(self):
        return f"{self.stock.symbol} @ {self.recorded_at:%Y-%m-%d %H:%M}"
