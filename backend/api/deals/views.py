from rest_framework import generics, status, viewsets
from rest_framework.response import Response

from .models import Deal, Tag
from .serializers import CommentsSerializer, DealsSerializer, TagsSerializer


class DealsViewSet(viewsets.ViewSet):
    queryset = Deal.objects.all()

    def create(self, request):
        deal_data = request.data.get("deal")
        comment_data = request.data.get("comment")

        deal_data.update({"author": request.user.id})
        deal = DealsSerializer(data=deal_data)
        deal.is_valid(raise_exception=True)
        deal_obj = deal.save()

        comment_data.update({"author": request.user.id, "deal": deal_obj.id})
        comment = CommentsSerializer(data=comment_data)
        comment.is_valid(raise_exception=True)
        comment.save()

        return Response("Deal was saved successfully!", status=status.HTTP_200_OK)


class TagsView(generics.ListAPIView):
    serializer_class = TagsSerializer
    queryset = Tag.objects.all()
