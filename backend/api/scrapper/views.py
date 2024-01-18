from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .scrapper import DealScrapper
from .tasks import scrap_data_from_tournament


class ScrapView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        url = request.data.get("url")
        scrapper = DealScrapper(url)
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


class ScrapTournamentView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        url = request.data.get("url")
        author_username = request.user.profile.username
        scrap_data_from_tournament.delay(url, author_username)
        return Response(
            {"result": "Your request is being processed"}, status=status.HTTP_200_OK
        )
