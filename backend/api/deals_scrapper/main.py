import re
import time

from bs4 import BeautifulSoup as bs
from selenium import webdriver

HANDS_ID = ["tabB_nCards0", "tabB_sCards0", "tabB_eCards0", "tabB_wCards0"]
PLAYERS = ["N", "S", "E", "W"]
VUL_ID = "tabB_bTitle0"
VUL_MAPPING = {
    "NS": [True, False],
    "WE": [False, True],
    "All": [True, True],
    "None": [False, False],
}
SUIT_MAPPING = {
    "hearts": "H",
    "spades": "S",
    "clubs": "C",
    "diamonds": "D",
    "notrump": "NT",
}

URL = "https://www.warsbrydz.pl/wyniki/1krok/PK231023/index.html#000000RR000000000001000001000001000000000000000000"


class bridge_scrapper:
    def __init__(self, url):
        driver = webdriver.Firefox()
        driver.get(url)
        time.sleep(1)
        self.soup = bs(driver.page_source, "html.parser")
        try:
            self._deal = self._scrap_deal()
            self._vulnerability = self._scrap_vulnerability()
            self._result_table = self._scrap_result_table()
            self._player = self._scrap_player()
        except ValueError:
            print("Unable to load the website data")

    def _scrap_deal(self):
        deal = {}
        for hand, player in zip(HANDS_ID, PLAYERS):
            cards = self.soup.find(id=hand).contents
            cards.append(self.soup.new_tag("br"))
            cards = [cards[i + 1] for i in range(len(cards)) if "img" in str(cards[i])]
            cards = ".".join([str(color).replace("<br/>", "") for color in cards])
            deal.update({player: cards})
        return deal

    def _scrap_vulnerability(self):
        vulnerability = self.soup.find(id=VUL_ID).h1.next_sibling
        vulnerability, _ = [item.strip() for item in str(vulnerability).split("/")]
        return VUL_MAPPING.get(vulnerability)

    def _scrap_player(self):
        player = self.soup.find(id=VUL_ID).h1.next_sibling
        _, player = [item.strip() for item in str(player).split("/")]
        return player

    def _scrap_result_table(self):
        result_table = {"lead": [], "contract": [], "player": [], "result": []}

        rows = self.soup.find(id="tabB_sgBody0").find_all("tr")
        for row in rows:
            row = row.find_all("td")
            if row[2].text == "ARB":
                break
            # Wist
            suit = re.search("(com/)(.*)(.gif)", str(row[4].img)).group(2)
            lead = SUIT_MAPPING.get(suit) + str(row[4].text)
            result_table["lead"].append(lead)

            # Contract
            suit = re.search("(com/)(.*)(.gif)", str(row[2].img)).group(2)
            contract = str(row[2].text) + SUIT_MAPPING.get(suit)
            result_table["contract"].append(contract)

            # player
            result_table["player"].append(row[3].text)
            # lewy
            result = 0 if row[5].text == "=" else row[5].text
            result_table["result"].append(result)
        return result_table

    @property
    def deal(self):
        return self._deal

    @property
    def vulnerability(self):
        return self._vulnerability

    @property
    def result_table(self):
        return self._result_table

    @property
    def player(self):
        return self._player


scrapper = bridge_scrapper(URL)
print(scrapper.deal)
print(scrapper.player)
print(scrapper.vulnerability)
print(scrapper.result_table)
