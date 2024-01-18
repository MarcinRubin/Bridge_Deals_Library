from django.urls import path

from .views import ScrapTournamentView, ScrapView

urlpatterns = [
    path("scrap_deal/", ScrapView.as_view(), name="scrap-view"),
    path("scrap_tournament/", ScrapTournamentView.as_view(), name="scrap-tournament"),
]
