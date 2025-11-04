from django.urls import path, include
from rest_framework import routers
from apps.referrals import views

router = routers.DefaultRouter()
router.register(r"referrals", views.ReferralView)

urlpatterns = [
    path("", include(router.urls)),
]