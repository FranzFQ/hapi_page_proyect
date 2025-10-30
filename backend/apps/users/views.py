from rest_framework import viewsets, renderers
from .serializer import UserSerializer, ClientProfileSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, ClientProfile

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]


class ClientProfileView(viewsets.ModelViewSet):
    serializer_class = ClientProfileSerializer
    queryset = ClientProfile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]
