from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import ListItem
from .serializers import ListItemSerializer
from .services.list_service import create_list

class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer

    @action(detail=False, methods=['post'])
    def create_with_items(self, request):
        """
        Endpoint personalizado para crear una lista con items
        """
        user = request.user
        title = request.data.get("title")
        items = request.data.get("items", [])

        if not title or not isinstance(items, list):
            return Response({"error": "Datos inválidos"}, status=status.HTTP_400_BAD_REQUEST)

        lista = create_list(user, title, items)
        return Response(ListItemSerializer(lista).data, status=status.HTTP_201_CREATED)
