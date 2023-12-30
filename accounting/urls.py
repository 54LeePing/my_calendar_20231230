from django.urls import path
from . import views
from .views import show_account_by_year_and_month
from .views import delete_account



urlpatterns = [
    path('', views.accounting, name = 'accounting'), 
    path('save_account/', views.save_account, name='save_account'),
    path('show_account_by_year_and_month/', show_account_by_year_and_month, name='show_account_by_year_and_month'),
    path('delete_account/<int:account_id>/', delete_account, name='delete_account'),
    
]