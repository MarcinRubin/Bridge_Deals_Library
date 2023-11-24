from django.urls import path
from rest_framework import routers

from .views import DealsViewSet, TagsView

router = routers.DefaultRouter()
router.register(r"", DealsViewSet)

urlpatterns = [path("tags/", TagsView.as_view(), name="tags-view")]

urlpatterns += router.urls
