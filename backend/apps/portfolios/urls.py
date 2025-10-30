from django.urls import path, include
from rest_framework import routers
from apps.portfolios import views

router = routers.DefaultRouter()
router.register(r"portfolio", views.PortfolioView)
router.register(r"portfolioinvestment", views.PortfolioInvestmentView)

urlpatterns = [
    path("", include(router.urls))
]