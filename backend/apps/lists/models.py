from django.db import models
from apps.users.models import User



class ListItem(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    title = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'user_lists'

class ListDetail(models.Model):
    list = models.ForeignKey(ListItem, models.DO_NOTHING)
    item_content = models.TextField()
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'user_list_details'

