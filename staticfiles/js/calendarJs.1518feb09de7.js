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
        let dayDescription = getDayDescription(date.getFullYear(), date.getMonth() + 1, dayCounter);
        calendarContent += `<div class="calendarDay" data-description="${dayDescription}">${dayCounter}</div>`;
        dayCounter++;
    }

    calendar.innerHTML = calendarContent;
}

function getDayDescription(year, month, day) {
    // 根據日期從後端獲取相應的description值，這裡需要根據你的後端實現這個函數
    // 返回相應日期的description，這裡先返回空字符串，實際應根據你的需求和後端設計
    return '';
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
