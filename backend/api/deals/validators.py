from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

DEALS_PLAYER = {"N", "S", "E", "W"}
DEALS_PARAMETERS = {"vul", "player"}
DEALS_KEYS = DEALS_PLAYER | DEALS_PARAMETERS
CARDS_IN_SUIT = {"2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"}


def validate_deal(deal_info):
    if DEALS_KEYS != set(deal_info.keys()):
        raise ValidationError("Deal data is incomplete")

    _validate_player(deal_info.get("player"))
    _validate_vul(deal_info.get("vul"))
    _validate_deck(
        n=deal_info.get("N"),
        s=deal_info.get("S"),
        e=deal_info.get("E"),
        w=deal_info.get("W"),
    )


def _validate_player(player):
    if player not in DEALS_PLAYER:
        raise ValidationError("Invalid player name")


def _validate_vul(vul):
    if len(vul) != 2:
        raise ValidationError("There should be 2 elements in vulnerability vector")
    if not isinstance(vul[0], bool) or not isinstance(vul[1], bool):
        raise ValidationError("In vulnerability list only boolean types are valid")


def _validate_deck(**kwargs):
    suits = {"spades": [], "hearts": [], "diamonds": [], "clubs": []}

    for player, cards in kwargs.items():
        mod_cards = cards.replace("10", "T")
        if len(mod_cards) != 16:
            raise ValidationError(
                _("Wrong number of cards for player %(value)s"),
                code="invalid",
                params={"value": player},
            )

        batches = mod_cards.split(".")
        if len(batches) != 4:
            raise ValidationError(
                _("Wrong number of suits for player %(value)s"),
                code="invalid",
                params={"value": player},
            )

        for suit, batch in zip(suits.values(), batches):
            suit.extend(batch)

    for suit, cards in suits.items():
        if set(cards) != CARDS_IN_SUIT:
            raise ValidationError(
                _("Card in %(value)s is repeated"),
                code="invalid",
                params={"value": suit},
            )
