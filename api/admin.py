from django.contrib import admin

from api.models import Profile, FriendRequest


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'friends')
        }),

    )


admin.site.register(Profile, ProfileAdmin)


class FriendRequestAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('from_user', 'to_user')
        }),
    )


admin.site.register(FriendRequest, FriendRequestAdmin)
