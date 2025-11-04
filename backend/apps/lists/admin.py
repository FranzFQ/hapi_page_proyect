from django.contrib import admin
from .models import ListItem, ListDetail

@admin.register(ListItem)
class ListItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'created_at')
    search_fields = ('title', 'user__username')

@admin.register(ListDetail)
class ListDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'list', 'item_content', 'added_at')
    search_fields = ('item_content',)
