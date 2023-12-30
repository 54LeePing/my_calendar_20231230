function generateCalendarWithDescriptions(date, eventData) {
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
        const eventsOnDay = eventData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === dayCounter;
        });

        calendarContent += `<div class="calendarDay">`;

        if (eventsOnDay.length > 0) {
            for (const event of eventsOnDay) {
                calendarContent += `<div class="eventDescription">${event.description}</div>`;
            }
        }

        calendarContent += `${dayCounter}</div>`;
        dayCounter++;
    }

    calendar.innerHTML = calendarContent;
}

document.addEventListener('DOMContentLoaded', function() {
    // 獲取當前日期
    let today = new Date();

    // 更新日期框的值
    document.getElementById('dateBox').valueAsDate = today;

    // Mock data for demonstration
    const mockData = [
        { description: 'Event 1', date: '2023-12-19', time: '12:00', is_important: true },
        // Add more data as needed
    ];

    // 生成行事曆
    generateCalendarWithDescriptions(today, mockData);

    // 監聽日期框的變更事件
    document.getElementById('dateBox').addEventListener('change', function() {
        let selectedDate = new Date(this.value);
        // Assuming you have the actual data from Django
        // Modify this line to use the actual data from Django
        generateCalendarWithDescriptions(selectedDate, mockData);
    });
});
