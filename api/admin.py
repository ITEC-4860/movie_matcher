from django.contrib import admin

from api.models import Profile


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'friends')
        }),

    )


admin.site.register(Profile, ProfileAdmin)
