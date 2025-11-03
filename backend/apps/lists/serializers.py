from rest_framework import serializers
from .models import ListItem, ListDetail

class ListDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListDetail
        fields = ["id", "item_content", "added_at"]

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ["id", "title", "created_at", "updated_at"]
