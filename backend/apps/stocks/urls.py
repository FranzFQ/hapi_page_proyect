from django.urls import path, include
from rest_framework import routers
from apps.stocks import views

router = routers.DefaultRouter()
router.register(r"stocks", views.StockViewSet, basename="stock")
router.register(r"categories", views.CategoryViewSet, basename="category")

urlpatterns = [
    path("search/", views.search_view, name="search"),  
    path("", include(router.urls)),
]

#Agregar en backend/urls.py:
#path('api/', include('apps.stocks.urls')),