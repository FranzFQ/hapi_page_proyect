from rest_framework import viewsets, renderers, views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from .serializer import UserSerializer, ClientProfileSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, ClientProfile

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]

    @method_decorator(ensure_csrf_cookie, name='dispatch')
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        user = serializer.instance
        
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        
        login(request, user)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ClientProfileView(viewsets.ModelViewSet):
    serializer_class = ClientProfileSerializer
    queryset = ClientProfile.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {"error": "Email y contraseña requeridos"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if user is not None and user.password == password:
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            
            login(request, user)
            
            try:
                client_id = ClientProfile.objects.get(user=user).id
            except ClientProfile.DoesNotExist:
                client_id = None

            return Response(
                {
                    "message": "Login exitoso", 
                    "userId": user.id,
                    "clientId": client_id,
                    "email": user.email
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Credenciales inválidas"},
                status=status.HTTP_401_UNAUTHORIZED
            )

@method_decorator(csrf_protect, name='dispatch')
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(
            {"message": "Logout exitoso"},
            status=status.HTTP_200_OK
        )