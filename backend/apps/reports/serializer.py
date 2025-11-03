from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('id', 'report_type', 'file_format', 'start_date', 'end_date', 'status', 'created_at')
        read_only_fields = ('status', 'created_at')