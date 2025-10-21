from rest_framework import viewsets
from .serializer import UserSerializer, ClientProfileSerializer
from .models import User, ClientProfile

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ClientProfileView(viewsets.ModelViewSet):
    serializer_class = ClientProfileSerializer
    queryset = ClientProfile.objects.all()
