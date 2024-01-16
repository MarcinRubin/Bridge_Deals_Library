from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Comment, Tag, Tournament
from .reports import (
    get_average_difficulty,
    get_difficulty_distribution,
    get_most_common_tags,
    get_number_of_all_deals,
)
from .serializers import CommentsSerializer, TagsSerializer, TournamentsSerializer


class UserCommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        # add super().get_quesryset()
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

    @action(detail=False, methods=["get"])
    def get_statistics(self, request, *args, **kwargs):
        comments = self.get_queryset()
        return Response(
            {
                "average_difficulty": get_average_difficulty(comments),
                "most_common_tags": get_most_common_tags(comments),
                "difficulty_distribution": get_difficulty_distribution(comments),
                "all_deals": get_number_of_all_deals(comments),
            },
            status=status.HTTP_200_OK,
        )


class TagsView(generics.ListAPIView):
    serializer_class = TagsSerializer
    queryset = Tag.objects.all()


class TournamentsView(generics.ListCreateAPIView):
    serializer_class = TournamentsSerializer
    queryset = Tournament.objects.all()
