from django.db import models
from datetime import datetime


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)

    class Meta:
        managed = False  # No permitir que Django cree/modifique esta tabla
        db_table = "stock_category"  # Nombre exacto en Supabase

    def __str__(self):
        return self.name


class Stock(models.Model):
    id = models.AutoField(primary_key=True)
    symbol = models.CharField(max_length=20, null=True)
    name = models.CharField(max_length=120, null=True)
    last_price = models.DecimalField(max_digits=15, decimal_places=2, null=True)
    variation = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    update_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    is_active = models.BooleanField(default=True)
    stock_category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        db_column="stock_category_id",  # nombre de la columna en tu tabla
        null=True,
    )

    class Meta:
        managed = False  #  Django no tocará esta tabla
        db_table = "stock"  

    def __str__(self):
        return f"{self.symbol} - {self.name}"

    def update_price(self):
        """
        Actualiza el precio del stock usando Yahoo Finance.
        """
        from .services.yahoo_service import update_stock_price

        success = update_stock_price(self.symbol)
        if success:
            self.update_at = datetime.now()
            self.save()
        return success


class StockPrice(models.Model):
    stock = models.ForeignKey(
        Stock, on_delete=models.CASCADE, related_name="prices"
    )
    date = models.DateField()
    close_price = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        managed = False  #  si esta tabla aún no existe en Supabase
        db_table = "stock_price"  
        unique_together = ("stock", "date")
        ordering = ["-date"]

    def __str__(self):
        return f"{self.stock.symbol} - {self.date} - {self.close_price}"
