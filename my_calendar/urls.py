"""
URL configuration for my_calendar project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from accounting import views
from accounting.views import show_account_by_year_and_month
from accounting.views import delete_account

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calendars.urls')),
    path('accounting/', include('accounting.urls')),
    path('save_account/', views.save_account, name='save_account'),
    path('show_account_by_year_and_month/', show_account_by_year_and_month, name='show_account_by_year_and_month'),
    path('delete_account/<int:account_id>/', delete_account, name='delete_account'),
]