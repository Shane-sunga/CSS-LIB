document.addEventListener("DOMContentLoaded", function () {
    function toggleSidebar() {
        document.querySelector(".sidebar").classList.toggle("open-sidebar");
    }

    const toggleButtons = document.querySelectorAll(".menu-toggle, .close-btn");

    toggleButtons.forEach(function (btn) {
        btn.addEventListener("click", toggleSidebar);
    });
});
