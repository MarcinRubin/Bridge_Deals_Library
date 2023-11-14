from django.urls import path

from .views import DealView

urlpatterns = [
    path("<int:pk>/", DealView.as_view(), name="deal-detail"),
]
