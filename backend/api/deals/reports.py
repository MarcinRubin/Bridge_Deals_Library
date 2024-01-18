from django.db.models import Avg, Count


def get_average_difficulty(comments):
    return list(comments.aggregate(Avg("difficulty")).values())[0]


def get_difficulty_distribution(comments):
    return list(
        comments.values("difficulty")
        .annotate(count=Count("difficulty"))
        .order_by("difficulty")
    )


def get_most_common_tags(comments):
    return list(
        comments.values("tags__name")
        .annotate(count=Count("tags__name"))
        .order_by("-count")
    )[:3]


def get_number_of_all_deals(comments):
    return comments.count()
