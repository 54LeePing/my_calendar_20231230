from django import forms
from .models import Calendar

class CalendarForm(forms.ModelForm):
    class Meta:
        model = Calendar
        fields = ['date', 'time', 'description', 'is_important']
