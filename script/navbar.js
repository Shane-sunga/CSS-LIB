document.addEventListener("DOMContentLoaded", function () {
    const navBars = document.querySelectorAll(".active-nav-links"); // Select all navigation bars

    navBars.forEach((nav) => {
        const links = nav.querySelectorAll(".act-links"); // Select links within this navbar

        links.forEach((link) => {
            link.addEventListener("focus", () => {
                const width = link.offsetWidth;
                const leftPosition = link.offsetLeft;

                // Apply styles only to the current navbar
                nav.style.setProperty("--bg-position", `${leftPosition}px`);
                nav.style.setProperty("--bg-width", `${width}px`);

                // Show background after first focus
                nav.classList.add("show-bg");

                // Update active state for links in this navbar only
                links.forEach(l => l.classList.remove("active-l"));
                link.classList.add("active-l");
            });
        });
    });
});
