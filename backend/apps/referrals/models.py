from django.db import models
from apps.users.models import User

class Referral(models.Model):
    code_used = models.CharField(max_length=50, blank=True, null=True)
    bonus_amount = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    processed_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    user_send = models.ForeignKey(User, models.DO_NOTHING)
    user_recibe = models.ForeignKey(User, models.DO_NOTHING, related_name='referral_user_recibe_set')

    class Meta:
        managed = False
        db_table = 'referral'