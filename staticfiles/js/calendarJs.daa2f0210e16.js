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

    // 使用全局變數 jsonData
    jsonData.mycalendars.forEach(function(event) {
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()) {
            calendarContent += `<div class="calendarDay">${eventDate.getDate()} - ${event.someField}</div>`;
        }
    });

    while (dayCounter <= daysInMonth) {
        calendarContent += `<div class="calendarDay">${dayCounter}</div>`;
        dayCounter++;
    }
    

    calendar.innerHTML = calendarContent;
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