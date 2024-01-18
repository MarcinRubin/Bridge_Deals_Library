import copy

import requests

DEALS_PLAYER = ["N", "S", "W", "E"]
DEALS_PARAMETERS = {"vul", "player"}
DEAL_TRICKS = ["NTricks", "STricks", "WTricks", "ETricks"]

SUITS = ["C", "D", "H", "S", "NT", "-"]
CARD = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "-"]
DOUBLE = ["", "X", "XX"]
HANDS = ["HandN", "HandS", "HandW", "HandE"]
TRICKS = ["TricksFromN", "TricksFromS", "TricksFromW", "TricksFromE"]
VULNERABILITY = [[False, False], [True, False], [False, True], [True, True]]


class DealScrapper:
    def __init__(self, url):
        # Add error handling if there are no response or url is invalid
        response = requests.get(url, timeout=10)
        self.status_code = response.status_code
        if self.status_code == 200:
            data = response.json()
            self.deal_data = data["ScoringGroups"][0]["Distribution"]["_handRecord"]
            self.deal_scores = data["ScoringGroups"][0]["Scores"]

    def get_status_code(self):
        return self.status_code

    def get_deal(self):
        deal_data_copy = copy.deepcopy(self.deal_data)
        return {
            player: [deal_data_copy[hand].pop("Hcp"), deal_data_copy[hand]][1]
            for player, hand in zip(DEALS_PLAYER, HANDS)
        }

    def get_dealer(self):
        return {"dealer": DEALS_PLAYER[self.deal_data["_declarer"]]}

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
            try:
                contract_data = score["NsScore"]
                contract = contract_data["Contract"]
                lead = contract_data["Lead"]
                if lead is None:
                    lead = {"CardColor": 5, "CardHeight": 13}
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
            except KeyError:
                # Probably just an empty row
                continue
        return score_table
