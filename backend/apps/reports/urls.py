from django.urls import path, include
from rest_framework import routers
from apps.reports import views

router = routers.DefaultRouter()
router.register(r"reports", views.ReportView)
router.register(r"notification", views.NotificationView)

urlpatterns = [
    path("", include(router.urls)),
]
