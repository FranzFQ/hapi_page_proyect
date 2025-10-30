from rest_framework import viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import ReportSerializer, NotificationSerializer
from .models import Report, Notification

class ReportView(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client_profile', 'created_at', 'end_date', 'start_date', 'type']
    renderer_classes = [renderers.JSONRenderer]

class NotificationView(viewsets.ModelViewSet):
    queryset = Notification.objects.all()  
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]

