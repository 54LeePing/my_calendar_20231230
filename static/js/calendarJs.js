function generateCalendar(date, eventsData = {}) {
    let calendar = document.querySelector('#mainCalendar');
    calendar.innerHTML = '';

    let firstDayOfMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    let daysInMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)).getUTCDate();
    let startingDay = firstDayOfMonth.getUTCDay();

    let calendarContent = '';
    let dayCounter = 1;

    for (let i = 0; i < startingDay; i++) {
        calendarContent += '<div class="calendarDay"></div>';
    }

    while (dayCounter <= daysInMonth) {
        let currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), dayCounter));
        let formattedDate = currentDate.toISOString().split('T')[0];

        let eventsForDay = eventsData[formattedDate];

        let dayContent = `<div class="calendarDay">${dayCounter}`;
        if (eventsForDay && eventsForDay.length > 0) {
            dayContent += '<br><ul>';
            eventsForDay.forEach(event => {
                dayContent += `<li>${event}</li>`;
            });
            dayContent += '</ul>';
        }
        dayContent += `</div>`;
        calendarContent += dayContent;

        dayCounter++;
    }

    calendar.innerHTML = calendarContent;
}

function fetchAndUpdateCalendar(selectedDate) {
    fetch('get_events') // 使用你的後端視圖URL
        .then(response => response.json())
        .then(data => {
            // 在取得的事件資料中有日期對應事件描述的字典
            generateCalendar(selectedDate, data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
        fetchAndUpdateCalendar(selectedDate);
    });

    // 從後端取得事件資料並更新日曆
    fetch('get_events') // 使用你的後端視圖URL
        .then(response => response.json())
        .then(data => {
            // 在取得的事件資料中有日期對應事件描述的字典
            generateCalendar(today, data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
