from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from .models import Account
from datetime import datetime
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.db.models import Sum


def accounting(request):
    mycalendars = Account.objects.all().values()
    template = loader.get_template('account.html')
    context = {
    'mycalendars': mycalendars,
    }
    return HttpResponse(template.render(context, request))

def save_account(request):
    if request.method == 'POST':
        # 獲取POST請求中的資料
        type = request.POST.get('type')
        date = request.POST.get('date')
        amount = request.POST.get('amount')

        # 創建Account物件並保存到資料庫中
        new_account = Account.objects.create(type=type, date=date, amount=amount)
        new_account.save()
        
        return render(request, 'account.html')
    else:
        return render(request, 'account.html')
    
def show_account_by_year_and_month(request):
    if request.method == 'POST':
        selected_year_month = request.POST.get('year_month')
        selected_date = datetime.strptime(selected_year_month, '%Y-%m')
        selected_year = selected_date.year
        selected_month = selected_date.month
        
        #過濾記帳紀錄
        filtered_accounts = Account.objects.filter(date__year=selected_year, date__month=selected_month)
        
        #計算總收入和總支出
        total_income = filtered_accounts.filter(amount__gt=0).aggregate(Sum('amount'))['amount__sum'] or 0
        total_expense = filtered_accounts.filter(amount__lt=0).aggregate(Sum('amount'))['amount__sum'] or 0
        
        context = {
            'filtered_accounts': filtered_accounts,
            'selected_year': selected_year,
            'selected_month': selected_month,
            'total_income': total_income,
            'total_expense': total_expense,
        }
        return render(request, 'account.html', context)
    else:
        return render(request, 'account.html')

def delete_account(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    
    account.delete()
    
    # 刪除後重定向到記帳頁面
    return HttpResponseRedirect(reverse('accounting'))