document.addEventListener("DOMContentLoaded", function () {
  const monthYear = document.querySelector(".month-year");
  const calendarDates = document.querySelector(".calendar-dates");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const modal = document.querySelector(".event-modal-overlay");
  const addModal = document.querySelector(".add-event-modal-overlay");
  const modalTitle = document.querySelector(".event-date-title");
  const addModalTitle = document.querySelector(".add-event-date-title");
  const closeModal = document.querySelector(".close-event-modal");
  const closeAddModal = document.querySelector(".close-add-event-modal");
  const calendar = document.querySelector(".calendar");
  const eventMessage = document.querySelector(".event-message");
  const addEventForm = document.getElementById("add-event-form");
  const newEventInput = document.getElementById("new-event-text");

  let date = new Date();
  const events = {};
  let selectedDate = "";

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

    const fragment = document.createDocumentFragment();

    // Empty slots before first day
    Array.from({ length: firstDay }).forEach(() => {
      fragment.appendChild(document.createElement("div"));
    });

    // Days of the month
    Array.from({ length: lastDate }).forEach((_, i) => {
      const day = i + 1;
      const isToday =
        day === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth();

      const dayEl = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = day;

      // Add indicator if there are events on this date
      const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      if (events[fullDate] && events[fullDate].length > 0) {
        const dot = document.createElement("div");
        dot.classList.add("event-dot");
        span.appendChild(dot);
      }

      if (isToday) {
        span.classList.add("today");
      }

      span.addEventListener("click", () => {
        selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        modalTitle.textContent = `Events on ${monthNames[month]} ${day}, ${year}`;

        const event = events[selectedDate];
        if (event && event.length > 0) {
          eventMessage.innerHTML = event
            .map(
              (e, i) => `
            <div>
              ${i + 1}. ${e}
              <button data-index="${i}" class="delete-single-event" style="color:red; margin-left:5px;">🗑</button>
            </div>
          `
            )
            .join("");
        } else {
          eventMessage.innerHTML = "No events yet for this day.";
        }

        // Add Event button
        if (!document.getElementById("add-event-btn")) {
          const addBtn = document.createElement("button");
          addBtn.id = "add-event-btn";
          addBtn.textContent = "Add Event";
          addBtn.style.marginTop = "10px";
          eventMessage.insertAdjacentElement("afterend", addBtn);

          addBtn.addEventListener("click", () => {
            addModal.classList.add("show");
            addModalTitle.textContent = selectedDate;
            newEventInput.value = "";
          });
        }

        modal.classList.add("show");
        calendar.classList.add("modal-open");

        // Allow deletion of individual events
        setTimeout(() => {
          document.querySelectorAll(".delete-single-event").forEach((btn) => {
            btn.addEventListener("click", () => {
              const index = parseInt(btn.getAttribute("data-index"));
              events[selectedDate].splice(index, 1);
              if (events[selectedDate].length === 0) {
                delete events[selectedDate];
              }
              modal.classList.remove("show");
              calendar.classList.remove("modal-open");
              renderCalendar(); // Re-render after deletion
            });
          });
        }, 0);
      });

      dayEl.appendChild(span);
      fragment.appendChild(dayEl);
    });

    // Empty slots after last day
    const totalCells = firstDay + lastDate;
    Array.from({ length: 42 - totalCells }).forEach(() => {
      fragment.appendChild(document.createElement("div"));
    });

    calendarDates.appendChild(fragment);
  }

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });

  // Close modals
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    calendar.classList.remove("modal-open");
    const btn = document.getElementById("add-event-btn");
    if (btn) btn.remove();
  });

  closeAddModal.addEventListener("click", () => {
    addModal.classList.remove("show");
  });

  // Submit new event
  addEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEvent = newEventInput.value.trim();
    if (newEvent) {
      if (!events[selectedDate]) {
        events[selectedDate] = [];
      }
      events[selectedDate].push(newEvent);
      addModal.classList.remove("show");
      modal.classList.remove("show");
      calendar.classList.remove("modal-open");
      renderCalendar();
    }
  });

  // Initial render
  renderCalendar();
});

function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // initial call
