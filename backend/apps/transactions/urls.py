from rest_framework import routers
from django.urls import path, include
from .views import TransactionViewSet, TransactionDetailViewSet

router = routers.DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transaction")
router.register(r"transaction-details", TransactionDetailViewSet, basename="transaction-detail")

urlpatterns = [
    path("", include(router.urls)),
]


#Agregar en backend/urls.py:
#path('api/', include('apps.transactions.urls')),