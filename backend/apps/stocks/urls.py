from rest_framework.routers import DefaultRouter
from .views import StockViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'stocks', StockViewSet, basename='stock')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = router.urls

#Agregar en backend/urls.py:
#path('api/', include('apps.stocks.urls')),