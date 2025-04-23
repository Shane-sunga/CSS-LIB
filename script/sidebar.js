document.addEventListener("DOMContentLoaded", function () {
    function toggleSidebar() {
        document.querySelector(".sidebar").classList.toggle("open-sidebar");
    }

    const toggleButtons = document.querySelectorAll(".menu-toggle, .close-btn");

    toggleButtons.forEach(function (btn) {
        btn.addEventListener("click", toggleSidebar);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".slide-sidebar");
    const toggleBtn = document.querySelector(".slide-toggle-btn");
    const content = document.querySelector(".cont-content"); // To adjust content margin smoothly

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");

        // Add a small delay before updating content margin (for smoother animation)
        setTimeout(() => {
            if (sidebar.classList.contains("collapsed")) {
                content.style.marginLeft = "60px";
            } else {
                content.style.marginLeft = "250px";
            }
        }, 100);
    });
});