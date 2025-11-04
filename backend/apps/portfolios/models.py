from django.db import models
from apps.users.models import ClientProfile
from apps.stocks.models import Stock

class Portfolio(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    total_investion = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    average_price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    current_value = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    client_profile = models.ForeignKey(ClientProfile, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'portfolio'


class PortfolioInvestment(models.Model):
    quantity = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    purchase_price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    purchased_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    stock = models.ForeignKey(Stock, models.DO_NOTHING)
    portfolio = models.ForeignKey(Portfolio, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'portfolio_investment'
