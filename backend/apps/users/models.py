from django.db import models

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


class AdminProfile(models.Model):
    access_level = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'admin_profile'


class ClientProfile(models.Model):
    balance_available = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    client_profilecol = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'client_profile'


class AdminPermissionsRequest(models.Model):
    status = models.CharField(max_length=50, blank=True, null=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    issued_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'admin_permissions_request'
