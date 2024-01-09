function generateCalendar(date) {
    let calendar = document.querySelector('#mainCalendar');
    calendar.innerHTML = '';

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let startingDay = firstDayOfMonth.getDay();

    let calendarContent = '';
    let dayCounter = 1;

    for (let i = 0; i < startingDay; i++) {
        calendarContent += '<div class="calendarDay"></div>';
    }

    while (dayCounter <= daysInMonth) {
        let description = addCalendarDescription(new Date(date), mycalendars);
        calendarContent += `<div class="calendarDay">${dayCounter}<br>${description}</div>`;
        dayCounter++;
    }

    calendar.innerHTML = calendarContent;
}

function addCalendarDescription(date, mycalendars) {
    for (let i = 0; i < mycalendars.length; i++) {
        if (date.getTime() === new Date(mycalendars[i].date).getTime()) {
            return mycalendars[i].description;
        }
    }
    return ''; // 如果沒有匹配的行事曆事件，返回空字符串
}

document.addEventListener('DOMContentLoaded', function() {
    // 獲取當前日期
    let today = new Date();

    // 更新日期框的值
    document.getElementById('dateBox').valueAsDate = today;

    // 生成行事曆
    generateCalendar(today);

    // 監聽日期框的變更事件
    document.getElementById('dateBox').addEventListener('change', function() {
        let selectedDate = new Date(this.value);
        generateCalendar(selectedDate);
    });
});
