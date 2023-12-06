from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

PLAYERS = {"N", "S", "E", "W"}
DEALS_PARAMETERS = {"vulnerability", "dealer"}
DEALS_KEYS = PLAYERS | DEALS_PARAMETERS
CARDS_IN_SUIT = {"2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"}
SUITS = {"Clubs", "Diamonds", "Hearts", "Spades"}


def validate_deal(deal_info):
    print(deal_info)
    if DEALS_KEYS != set(deal_info.keys()):
        raise ValidationError("Deal data is incomplete")

    _validate_dealer(deal_info.get("dealer"))
    _validate_vul(deal_info.get("vulnerability"))
    _validate_deck(
        n=deal_info.get("N"),
        s=deal_info.get("S"),
        e=deal_info.get("E"),
        w=deal_info.get("W"),
    )


def _validate_dealer(dealer):
    if dealer not in PLAYERS:
        raise ValidationError("Invalid player name")


def _validate_vul(vul):
    if len(vul) != 2:
        raise ValidationError("There should be 2 elements in vulnerability vector")
    if not isinstance(vul[0], bool) or not isinstance(vul[1], bool):
        raise ValidationError("In vulnerability list only boolean types are valid")


def _validate_deck(**kwargs):
    suits = {"spades": [], "hearts": [], "diamonds": [], "clubs": []}

    for player, hand in kwargs.items():
        if set(hand.keys()) != SUITS:
            raise ValidationError(
                _("Invalid suits or number of suits in hand of player %(value)s"),
                code="invalid",
                params={"value": player},
            )

        hand_as_vector = [suit.replace("10", "T") for suit in hand.values()]
        if len("".join(hand_as_vector)) != 13:
            raise ValidationError(
                _("Wrong number of cards for player %(value)s"),
                code="invalid",
                params={"value": player},
            )

        for suit, batch in zip(hand_as_vector, suits.values()):
            batch.extend(list(suit))

    print(suits)
    for suit, cards in suits.items():
        if set(cards) != CARDS_IN_SUIT:
            raise ValidationError(
                _("Invalid number of cards in %(value)s suit"),
                code="invalid",
                params={"value": suit},
            )
