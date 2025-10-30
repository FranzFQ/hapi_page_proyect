from rest_framework import viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import PortfolioSerializer, PortfolioInvestmentSerializer
from .models import Portfolio, PortfolioInvestment

class PortfolioView(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]

class PortfolioInvestmentView(viewsets.ModelViewSet):
    queryset = PortfolioInvestment.objects.all()
    serializer_class = PortfolioInvestmentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]