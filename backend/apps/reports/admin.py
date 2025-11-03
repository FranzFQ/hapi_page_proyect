from django.contrib import admin
from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'client_profile', 'report_type', 'file_format', 'status', 'created_at')
    list_filter = ('status', 'report_type', 'file_format')
    search_fields = ('client_profile__user__email',)