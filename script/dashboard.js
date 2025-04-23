document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.querySelector(".month-year");
  const calendarDates = document.querySelector(".calendar-dates");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let date = new Date();

  function renderCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;
    calendarDates.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      calendarDates.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday =
        i === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth();
      calendarDates.innerHTML += `<div><span class="${
        isToday ? "today" : ""
      }">${i}</span></div>`;
    }

    const totalCells = firstDay + lastDate;
    for (let i = totalCells; i < 42; i++) {
      calendarDates.innerHTML += `<div></div>`;
    }
  }

  prevBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // initial call
