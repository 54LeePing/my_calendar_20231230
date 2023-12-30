from django.contrib import admin
from .models import Account

class AccountAdmin(admin.ModelAdmin):
    list_display = ("type", "date", "amount")
admin.site.register(Account, AccountAdmin)
