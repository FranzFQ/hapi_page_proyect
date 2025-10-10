from django.db import models
from apps.users.models import ClientProfile
from apps.stocks.models import Stock

class Transaction(models.Model):
    code = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    client_profile = models.ForeignKey(ClientProfile, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'transaction'


class TransactionDetail(models.Model):
    quantity = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    stock = models.ForeignKey(Stock, models.DO_NOTHING)
    transaction = models.ForeignKey(Transaction, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'transaction_detail'