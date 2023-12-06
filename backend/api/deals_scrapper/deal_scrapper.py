import requests

DEALS_PLAYER = ["N", "S", "W", "E"]
DEALS_PARAMETERS = {"vul", "player"}
DEAL_TRICKS = ["NTrick", "STricks", "WTricks", "ETricks"]

SUITS = ["C", "D", "H", "S", "NT"]
CARD = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
DOUBLE = ["", "X", "XX"]
HANDS = ["HandN", "HandS", "HandW", "HandE"]
TRICKS = ["TricksFromN", "TricksFromS", "TricksFromW", "TricksFromE"]
VULNERABILITY = [[False, False], [True, False], [False, True], [True, True]]


class deal_scrapper:
    def __init__(self, url):
        # Add error handling if there are no response or url is invalid
        response = requests.get(url, timeout=10)
        data = response.json()
        self.deal_data = data["ScoringGroups"][0]["Distribution"]["_handRecord"]
        self.deal_scores = data["ScoringGroups"][0]["Scores"]

    def get_deal(self):
        return {
            player: [self.deal_data[hand].pop("Hcp"), self.deal_data[hand]][1]
            for player, hand in zip(DEALS_PLAYER, HANDS)
        }

    def get_dealer(self):
        return {"dealer": DEALS_PLAYER[self.deal_data["Dealer"]]}

    def get_vulnerability(self):
        return {"vulnerability": VULNERABILITY[self.deal_data["Vulnerability"]]}

    def get_deal_tricks(self):
        return {
            deal_trick: self.deal_data[trick]
            for trick, deal_trick in zip(TRICKS, DEAL_TRICKS)
        }

    def get_scores(self):
        score_table = []
        for score in self.deal_scores:
            contract_data = score["NsScore"]
            contract = contract_data["Contract"]
            lead = contract_data["Lead"]
            score_table.append(
                {
                    "player": DEALS_PLAYER[contract["Declarer"]],
                    "suit": SUITS[contract["Denomination"]],
                    "double": DOUBLE[contract["Xx"]],
                    "height": contract["Height"],
                    "lead_suit": SUITS[lead["CardColor"]],
                    "lead_card": CARD[lead["CardHeight"]],
                    "score": contract_data["Score"],
                    "overtricks": contract_data["Overtricks"],
                }
            )

        return score_table


URL = "https://www.warsbrydz.pl/wyniki/1krok/PK231127/p1.json"
# deal = deal_scrapper(URL)
# ans = {**deal.get_deal(), **deal.get_dealer(), **deal.get_vulnerability()}
# print(ans)
