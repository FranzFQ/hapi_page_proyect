from django.urls import path, include
from rest_framework import routers
from apps.transfer import views

router = routers.DefaultRouter()
router.register(r"transfer", views.TransferView)

urlpatterns = [
    path("", include(router.urls)),
]