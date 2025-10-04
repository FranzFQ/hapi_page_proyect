from django.db import models
from apps.users.models import User, ClientProfile

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


class Notification(models.Model):
    type = models.CharField(max_length=50, blank=True, null=True)
    reviewer = models.CharField(max_length=100, blank=True, null=True)
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    is_sent = models.BooleanField(blank=True, null=True)
    is_active = models.BooleanField(blank=True, null=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    report = models.ForeignKey(Report, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'notification'