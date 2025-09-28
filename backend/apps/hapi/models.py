# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AdminPermissionsRequest(models.Model):
    status = models.CharField(max_length=50, blank=True, null=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    issued_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'admin_permissions_request'


class AdminProfile(models.Model):
    access_level = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'admin_profile'


class ClientProfile(models.Model):
    balance_available = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    client_profilecol = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'client_profile'


class Notification(models.Model):
    type = models.CharField(max_length=50, blank=True, null=True)
    reviewer = models.CharField(max_length=100, blank=True, null=True)
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    is_sent = models.BooleanField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING)
    report = models.ForeignKey('Report', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'notification'


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
    stock = models.ForeignKey('Stock', models.DO_NOTHING)
    portfolio = models.ForeignKey(Portfolio, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'portfolio_investment'


class Referral(models.Model):
    code_used = models.CharField(max_length=50, blank=True, null=True)
    bonus_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    processed_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    user_send = models.ForeignKey('User', models.DO_NOTHING)
    user_recibe = models.ForeignKey('User', models.DO_NOTHING, related_name='referral_user_recibe_set')

    class Meta:
        managed = False
        db_table = 'referral'


class Report(models.Model):
    type = models.CharField(max_length=50, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    file_content = models.BinaryField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    client_profile = models.ForeignKey(ClientProfile, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'report'


class Stock(models.Model):
    symbol = models.CharField(max_length=20, blank=True, null=True)
    name = models.CharField(max_length=120, blank=True, null=True)
    last_price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    variation = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    update_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    stock_category = models.ForeignKey('StockCategory', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stock'


class StockCategory(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock_category'


class StockPrice(models.Model):
    price = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    recorded_at = models.DateTimeField(blank=True, null=True)
    stock = models.ForeignKey(Stock, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'stock_price'


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


class User(models.Model):
    password = models.CharField(max_length=255, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(unique=True, max_length=150, blank=True, null=True)
    is_staff = models.BooleanField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    date_joined = models.DateTimeField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    last_ip = models.GenericIPAddressField(blank=True, null=True)
    status = models.CharField(max_length=45, blank=True, null=True)
    referral_code = models.CharField(unique=True, max_length=50, blank=True, null=True)
    used_referral_code = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
