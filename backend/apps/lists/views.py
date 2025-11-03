from rest_framework import viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ListDetailSerializer, ListItemSerializer
from .models import ListItem, ListDetail

class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    filterset_fields = ["id", "title", "created_at", "updated_at"]
    renderer_classes = [renderers.JSONRenderer]

class ListDetailViewSet(viewsets.ModelViewSet):
    queryset = ListDetail.objects.all()
    serializer_class = ListDetailSerializer
    filterset_fields = ["id", "item_content", "added_at"]
    renderer_classes = [renderers.JSONRenderer]