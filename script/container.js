document.querySelectorAll(".copyButton").forEach(function (button) {
    button.addEventListener("click", function () {
        const btn = this;
        const originalIcon = 'bi bi-clipboard';
        const originalText = ' Copy';
        btn.classList.add("slide-up");
        const container = btn.closest(".code-style");
        const code = container.querySelector(".codeBlock").innerText;

        navigator.clipboard.writeText(code).then(() => {
            btn.className = 'bi bi-clipboard-check copyButton slide-down';
            btn.textContent = ' Copied!';

            setTimeout(() => {
                btn.classList.remove("slide-down");
                btn.classList.add("slide-up");

                setTimeout(() => {
                    btn.className = originalIcon + ' copyButton slide-down';
                    btn.textContent = originalText;
                }, 300);
            }, 2000);
        });
    });
});
