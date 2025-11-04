from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListItemViewSet, ListDetailViewSet

router = DefaultRouter()
router.register(r'lists', ListItemViewSet)
router.register(r'lists-details', ListDetailViewSet)

urlpatterns = [
    path('', include(router.urls))
]