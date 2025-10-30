from rest_framework import viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import ReferralSerializer
from .models import Referral

class ReferralView(viewsets.ModelViewSet):
    serializer_class = ReferralSerializer
    queryset = Referral.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = "__all__"
    renderer_classes = [renderers.JSONRenderer]
