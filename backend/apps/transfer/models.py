from django.db import models
from apps.users.models import ClientProfile

class Transfer(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    client = models.ForeignKey(ClientProfile, models.DO_NOTHING, blank=True, null=True)
    amount = models.FloatField(blank=True, null=True)
    transfer_type = models.TextField(blank=True, null=True)
    discountdiscount = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transfer'
