from time import sleep

from celery import shared_task
from deals.serializers import CommentsSerializer

from .scrapper import DealScrapper


@shared_task()
def scrap_data_from_tournament(url, author_username):
    deal_number = 1
    data = DealScrapper(f"{url}/p{deal_number}.json")
    while data.get_status_code() == 200:
        comment_data = {
            "body": "",
            "visibility": "true",
            "difficulty": "1",
            "author": author_username,
            "directory": "Other",
            "tags": [],
        }
        deal = {
            "name": str(deal_number),
            "tournament": 1,
            "deal_info": {
                **data.get_deal(),
                **data.get_dealer(),
                **data.get_vulnerability(),
            },
            "trick_table": data.get_deal_tricks(),
            "result_table": data.get_scores(),
            "author": author_username,
            "visibility": True,
        }
        comment_data.update({"deal": deal})
        serializer = CommentsSerializer(data=comment_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        deal_number += 1
        sleep(1)
        data = DealScrapper(f"{url}/p{deal_number}.json")
