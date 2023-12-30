from django.urls import path
from . import views

urlpatterns = [
    path('', views.calendars, name = 'calendars'), 
    path('events/', views.events, name = 'events'),
    path('create/', views.create_calendar, name='create_calendar'),
    path('delete/', views.delete_calendar, name='delete_calendar'),
]