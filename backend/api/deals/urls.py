from django.urls import path
from rest_framework import routers

from .views import DealsViewSet, TagsView, TournamentsView, UserCommentViewSet

router = routers.DefaultRouter()
router.register(r"deals", DealsViewSet)
router.register(r"my_comments", UserCommentViewSet, basename="my-comments")

urlpatterns = [
    path("tags/", TagsView.as_view(), name="tags-view"),
    path("tournaments/", TournamentsView.as_view(), name="tournament-view"),
]

urlpatterns += router.urls
