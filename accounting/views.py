from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from .models import Account
from datetime import datetime
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404


def accounting(request):
    mycalendars = Account.objects.all().values()
    template = loader.get_template('account.html')
    context = {
    'mycalendars': mycalendars,
    }
    return HttpResponse(template.render(context, request))

def save_account(request):
    # 在這裡處理保存資料的邏輯，可能需要使用POST請求中的資料來創建Account物件
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
        # 解析所選的年份和月份
        selected_date = datetime.strptime(selected_year_month, '%Y-%m')
        selected_year = selected_date.year
        selected_month = selected_date.month
        
        # 根據選擇的年份和月份過濾帳目
        filtered_accounts = Account.objects.filter(date__year=selected_year, date__month=selected_month)
        context = {'filtered_accounts': filtered_accounts}
        return render(request, 'account.html', context)
    else:
        return render(request, 'account.html')

def ChooseMoouth(request):
    # 如果是 POST 請求，取得用戶選擇的月份
    if request.method == 'POST':
        selected_month = request.POST.get('month')
        # 根據用戶選擇的月份篩選資料
        filtered_accounts = Account.objects.filter(date__month=selected_month)
    else:
        # 如果是 GET 請求，顯示所有資料
        filtered_accounts = Account.objects.all()

    context = {
        'filtered_accounts': filtered_accounts
    }
    return render(request, 'your_template.html', context)

def delete_account(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    
    account.delete()
    
    # 刪除後重定向到某個頁面
    return HttpResponseRedirect(reverse('accounting'))