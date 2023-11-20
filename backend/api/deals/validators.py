from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validate_deal(deal_info):
    expected_keys = {"N", "vul", "E", "W", "player", "S"}
    if expected_keys != set(deal_info.keys()):
        raise ValidationError("Deal data is incomplete")

    validate_player(deal_info.get("player"))
    validate_vul(deal_info.get("vul"))
    validate_deck(
        n=deal_info.get("N"),
        s=deal_info.get("S"),
        e=deal_info.get("E"),
        w=deal_info.get("W"),
    )


def validate_player(player):
    expected_players = {"N", "S", "E", "W"}
    if player not in expected_players:
        raise ValidationError("Invalid player name")


def validate_vul(vul):
    if len(vul) != 2:
        raise ValidationError("There should be 2 elements in vulnerability vector")
    if not isinstance(vul[0], bool) or not isinstance(vul[1], bool):
        raise ValidationError("In vulnerability list only boolean types are valid")


def validate_deck(**kwargs):
    cards_in_suit = {"2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"}
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
        if set(cards) != cards_in_suit:
            raise ValidationError(
                _("Card in %(value)s is repeated"),
                code="invalid",
                params={"value": suit},
            )
