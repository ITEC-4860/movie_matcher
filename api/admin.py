from django.contrib import admin

from api.models import Profile


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'phone', 'address', 'city', 'state', 'zip')
        }),

    )


admin.site.register(Profile, ProfileAdmin)
