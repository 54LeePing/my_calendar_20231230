from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import loader
from .models import Calendar
from .forms import CalendarForm
import time

def calendars(request):
    mycalendars = Calendar.objects.all().values()
    timestamp = int(time.time())
    context = {
        'mycalendars': mycalendars,
        'timestamp': timestamp,
    }
    return render(request, 'calendars.html', context)

def events(request):
    timestamp = int(time.time())
    context = {
        'timestamp': timestamp,
    }
    return render(request, 'events.html', context)

def create_calendar(request):
    if request.method == 'POST':
        date = request.POST.get('date')
        form = CalendarForm(request.POST) #檢查是否為POST的請求(也就等同於輸入資料)
        context = {
            'date': date,
        }
        if form.is_valid():
            form.save()
            # print("New calendar event saved")
            return render(request, 'events.html', context)  # 導向到行事曆頁面
    else:
        form = CalendarForm()
    
    return render(request, 'events.html', context)

def delete_calendar(request):
    if request.method == 'POST':
        date = request.POST.get('date')  # 取得日期
        events_to_delete = request.POST.getlist('events_to_delete')  # 取得要刪除的事件 ID 列表

        # 獲取該日期的所有事件
        events_on_date = Calendar.objects.filter(date=date)

        for event_id in events_to_delete:
            event = events_on_date.filter(id=event_id).first()
            if event:
                event.delete()

        # 取得刪除後的該日期事件列表
        updated_events = Calendar.objects.filter(date=date)

        # 重新渲染 events.html，將更新後的事件列表傳遞到模板中
        timestamp = int(time.time())
        context = {
            'date': date,
            'timestamp': timestamp,
            'events': updated_events,
        }
        return render(request, 'events.html', context)
            