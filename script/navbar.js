document.addEventListener("DOMContentLoaded", function () {
    const navBars = document.querySelectorAll(".active-nav-links");

    navBars.forEach((nav) => {
        const links = nav.querySelectorAll(".act-links");
        let activeLink = null;

        links.forEach((link) => {
            link.addEventListener("focus", () => {
                activeLink = link;
                applyNavStyle(nav, link);
                nav.classList.add("show-bg");

                links.forEach((l) => l.classList.remove("active-l"));
                link.classList.add("active-l");
            });
        });

        window.addEventListener("resize", () => {
            if (activeLink) {
                applyNavStyle(nav, activeLink);
            }
        });
    });

    // ✅ Toggle ONLY top-navbar-sub without hiding others
    const topSubMenuIcon = document.querySelector(".top-navbar-sub .menu-icon");
    const topSubNavLinks = document.querySelector(".top-navbar-sub .top-nav-links-sub");

    if (topSubMenuIcon && topSubNavLinks) {
        topSubMenuIcon.addEventListener("click", function () {
            topSubNavLinks.classList.toggle("show");
        });
    }

    // ✅ Keep existing menu toggle logic for other navbars
    const menuIcons = document.querySelectorAll('.menu-icon:not(.top-navbar-sub .menu-icon)');

    menuIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const container = icon.closest(
                '.top-navbar-primary, .top-navbar-secondary, .active-navbar-cont-primary, .active-navbar-cont-secondary'
            );
            if (!container) return;

            const navLinks = container.querySelector('.top-nav-links') || container.querySelector('.active-nav-links');

            // Close all other navs
            document.querySelectorAll('.top-nav-links.active, .active-nav-links.active').forEach(openNav => {
                if (openNav !== navLinks) {
                    openNav.classList.remove('active');
                }
            });

            // Toggle the clicked one
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    });
});

function applyNavStyle(nav, link) {
    const isMobile = window.innerWidth <= 765;

    if (isMobile) {
        const top = link.offsetTop;
        const height = link.offsetHeight;

        nav.style.setProperty("--bg-position-top", `${top}px`);
        nav.style.setProperty("--bg-height", `${height}px`);
        nav.style.setProperty("--bg-position", `5%`); // 5% margin on left
        nav.style.setProperty("--bg-width", `90%`);   // centered with left+right margin
    } else {
        const linkWidth = link.offsetWidth;
        const linkLeft = link.offsetLeft;

        // Add margin or center the background based on link width
        const margin = 10; // You can adjust this as needed
        const centeredLeft = linkLeft - margin;
        const centeredWidth = linkWidth + margin * 2;

        nav.style.setProperty("--bg-position", `${centeredLeft}px`);
        nav.style.setProperty("--bg-width", `${centeredWidth}px`);
        nav.style.setProperty("--bg-position-top", `0`);
        nav.style.setProperty("--bg-height", `100%`);
    }
}
