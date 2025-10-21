from rest_framework import viewsets
from .serializer import ReferralSerializer
from .models import Referral

class ReferralView(viewsets.ModelViewSet):
    serializer_class = ReferralSerializer
    queryset = Referral.objects.all()
    
