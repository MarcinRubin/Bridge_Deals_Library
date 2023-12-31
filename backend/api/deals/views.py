from deals_scrapper.deal_scrapper import deal_scrapper
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Comment, Deal, Tag
from .serializers import (
    CommentsSerializer,
    DealsSerializer,
    DealsSerializerGeneral,
    TagsSerializer,
)


class UserCommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user.profile)

    def create(self, request, *args, **kwargs):
        data = request.data
        data.update({"author": request.user.profile.username})
        data["deal"].update({"author": request.user.profile.username})
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=["patch"])
    def remove_directory(self, request, *args, **kwargs):
        to_delete = request.data.get("toDelete", None)
        to_change = request.data.get("moveTo", None)
        instances = self.get_queryset().filter(directory__in=to_delete)
        for instance in instances:
            serializer = self.get_serializer(
                instance, data={"directory": to_change}, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DealsViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend]
    queryset = Deal.objects.all()
    serializer_action_classes = {
        "list": DealsSerializer,
        "retrieve": DealsSerializer,
        "create": DealsSerializer,
        "mydeals": DealsSerializerGeneral,
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == "mydeals":
            queryset.filter(author=self.request.user)
        return queryset

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        deal_data = request.data.get("deal")
        comment_data = request.data.get("comment", {})

        deal_data.update({"author": request.user.id})
        deal = self.get_serializer(data=deal_data)
        deal.is_valid(raise_exception=True)
        deal_obj = deal.save()

        comment_data.update({"author": request.user.profile.id, "deal": deal_obj.id})
        comment = CommentsSerializer(data=comment_data)
        comment.is_valid(raise_exception=True)
        comment.save()

        return Response("Deal was saved successfully!", status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def mydeals(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(author=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class TagsView(generics.ListAPIView):
    serializer_class = TagsSerializer
    queryset = Tag.objects.all()


class ScrapView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        url = request.data.get("url")
        scrapper = deal_scrapper(url)
        response = {
            "deal_info": {
                **scrapper.get_deal(),
                **scrapper.get_dealer(),
                **scrapper.get_vulnerability(),
            },
            "trick_table": scrapper.get_deal_tricks(),
            "result_table": scrapper.get_scores(),
        }
        return Response(response, status=status.HTTP_200_OK)
