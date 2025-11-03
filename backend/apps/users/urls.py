from django.urls import path, include
from rest_framework import routers
from apps.users import views

router = routers.DefaultRouter()
router.register(r"users", views.UserView, basename="user")
router.register(r"client-profiles", views.ClientProfileView, basename="client-profile")

urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
]