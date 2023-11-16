from rest_framework import generics

from .models import Deal
from .serializers import DealsSerializer


class DealsView(generics.ListAPIView):
    # pylint: disable=no-member
    serializer_class = DealsSerializer
    queryset = Deal.objects.all()
