from rest_framework import serializers
from .models import Portfolio, PortfolioInvestment

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'

class PortfolioInvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioInvestment
        fields = '__all__'