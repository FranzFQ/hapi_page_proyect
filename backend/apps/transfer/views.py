from rest_framework import viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import TransferSerializer
from .models import Transfer

class TransferView(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()  
    serializer_class = TransferSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]
