from rest_framework.routers import DefaultRouter
from .views import ListItemViewSet

router = DefaultRouter()
router.register(r'lists', ListItemViewSet, basename='lists')

urlpatterns = router.urls

#Agregar en backend/urls.py:
#path('api/', include('apps.lists.urls')),