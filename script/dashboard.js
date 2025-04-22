      //FIRST CHART
      const ctx = document.querySelector(".chart-canvas").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["2021", "2022", "2023", "2024", "2025"],
          datasets: [
            {
              label: "Dataset 1",
              data: [2, 4, 6, 5, 3],
              backgroundColor: "#3a5a8d",
            },
            {
              label: "Dataset 2",
              data: [4, 6, 3, 2, 1],
              backgroundColor: "#0d2a4a",
            },
            {
              label: "Dataset 3",
              data: [6, 3, 2, 1, 3],
              backgroundColor: "#6ca0d1",
            },
            {
              label: "Dataset 4",
              data: [5, 2, 1, 0.5, 0.5],
              backgroundColor: "#a3c9e2",
            },
            {
              label: "Dataset 5",
              data: [3, 1, 0.5, 3, 3],
              backgroundColor: "#1d3c6e",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          animation: {
            duration: 1500,
            easing: "easeOutBounce",
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 6,
            },
          },
        },
      });
      //SECOND CHART
      const chart = document.querySelector(".area-chart").getContext("2d");

      new Chart(chart, {
        type: "line",
        data: {
          labels: ["2000", "2010", "2020", "2021"],
          datasets: [
            {
              label: "Series 1",
              data: [10, 25, 5, 30],
              backgroundColor: "#0d2a4a",
              borderColor: "transparent",
              fill: true,
            },
            {
              label: "Series 2",
              data: [15, 15, 30, 40],
              backgroundColor: "#3a5a8d",
              borderColor: "transparent",
              fill: true,
            },
            {
              label: "Series 3",
              data: [20, 10, 40, 15],
              backgroundColor: "#6ca0d1",
              borderColor: "transparent",
              fill: true,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                font: {
                  weight: "bold",
                },
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
      //CLOCK
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