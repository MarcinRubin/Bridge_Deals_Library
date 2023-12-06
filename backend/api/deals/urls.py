from django.urls import path
from rest_framework import routers

from .views import DealsViewSet, ScrapView, TagsView

router = routers.DefaultRouter()
router.register(r"", DealsViewSet)

urlpatterns = [
    path("tags/", TagsView.as_view(), name="tags-view"),
    path("scrap_deal/", ScrapView.as_view(), name="scrap-view"),
]

urlpatterns += router.urls
