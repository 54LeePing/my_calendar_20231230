from django.contrib import admin
from .models import Calendar

class CalendarAdmin(admin.ModelAdmin):
    list_display = ("date", "time", "description", "is_important")
admin.site.register(Calendar, CalendarAdmin)
