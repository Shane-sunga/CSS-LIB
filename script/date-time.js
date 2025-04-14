// Realtime clock script
document.addEventListener("DOMContentLoaded", function(){
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); 
        document.querySelector(".clock").textContent = timeString;
        document.querySelector(".loading").style.display = "none"; 
    }
    
    setInterval(updateClock, 1000);
    updateClock();  


});

window.addEventListener("DOMContentLoaded", function () {
    const daySelect = document.querySelector(".input-day");
    const monthSelect = document.querySelector(".input-month");
    const yearSelect = document.querySelector(".input-year");
    const fullDateInput = document.querySelector(".input-full-date");

    if (!daySelect || !monthSelect || !yearSelect || !fullDateInput) {
        console.error("One or more select elements are missing.");
        return;
    }

    // Populate Month Dropdown
    const months = [
        { name: "January", days: 31 },
        { name: "February", days: 28 }, // Default, will update for leap years
        { name: "March", days: 31 },
        { name: "April", days: 30 },
        { name: "May", days: 31 },
        { name: "June", days: 30 },
        { name: "July", days: 31 },
        { name: "August", days: 31 },
        { name: "September", days: 30 },
        { name: "October", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 }
    ];

    months.forEach((month, index) => {
        let option = new Option(month.name, (index + 1).toString().padStart(2, '0'));
        monthSelect.appendChild(option);
    });

    // Populate Year Dropdown (From 1900 to Current Year)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        let option = new Option(i, i);
        yearSelect.appendChild(option);
    }

    // Function to Update Day Dropdown Based on Month & Year
    function updateDays() {
        let selectedMonth = parseInt(monthSelect.value);
        let selectedYear = parseInt(yearSelect.value);
        let daysInMonth = 31; // Default

        if (selectedMonth) {
            daysInMonth = months[selectedMonth - 1].days;

            // Handle February (Leap Year Check)
            if (selectedMonth === 2) {
                if (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) {
                    daysInMonth = 29; // Leap year
                } else {
                    daysInMonth = 28;
                }
            }
        }

        // Store previous selected day
        let previousDay = parseInt(daySelect.value);

        // Clear existing days
        daySelect.innerHTML = '<option value="">DD</option>';
        for (let i = 1; i <= daysInMonth; i++) {
            let option = new Option(i, i.toString().padStart(2, '0'));
            daySelect.appendChild(option);
        }

        // Restore previous valid day if available
        if (previousDay && previousDay <= daysInMonth) {
            daySelect.value = previousDay.toString().padStart(2, '0');
        } else {
            daySelect.value = ""; // Reset if invalid
        }

        combineDate(); // Update full date after changing days
    }

    // Function to Combine Date and Store in Hidden Input
    function combineDate() {
        let day = daySelect.value;
        let month = monthSelect.value;
        let year = yearSelect.value;

        if (day && month && year) {
            fullDateInput.value = `${year}-${month}-${day}`;
        }
    }

    // Attach event listeners
    daySelect.addEventListener("change", combineDate);
    monthSelect.addEventListener("change", () => {
        updateDays();
        combineDate();
    });
    yearSelect.addEventListener("change", () => {
        updateDays();
        combineDate();
    });

    // Initialize Days Dropdown **AFTER** event listeners are set
    updateDays();
});



