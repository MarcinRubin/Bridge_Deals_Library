from rest_framework import generics

from .models import Deal
from .serializers import DealsSerializer


class DealView(generics.RetrieveAPIView):
    serializer_class = DealsSerializer
    queryset = Deal
