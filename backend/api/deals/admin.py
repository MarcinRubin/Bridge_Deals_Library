from django.contrib import admin

from .models import Comment, Deal, Tag, Tournament

admin.site.register(Comment)
admin.site.register(Deal)
admin.site.register(Tournament)
admin.site.register(Tag)
