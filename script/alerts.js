
document.addEventListener("DOMContentLoaded", function () {
    // Handle close button clicks
    const closeButtons = document.querySelectorAll('.bi-x-lg');

    if (closeButtons.length > 0) {
        closeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const alertContainer = button.closest("div");
                if (alertContainer) {
                    alertContainer.style.display = "none";
                }
            });
        });
    }
    // Button to Open Modals
    document.querySelectorAll(".small-btn-alert-success").forEach(button => {
        button.addEventListener("click", function () {
            openModal("small-alert-success");
        });
    });
    document.querySelectorAll(".small-btn-alert-denied").forEach(button => {
        button.addEventListener("click", function () {
            openModal("small-alert-denied");
        });
    });



    // Close buttons
    document.querySelectorAll(".alert-confirm-btn-success").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("small-alert-success");
        });
    });
    document.querySelectorAll(".alert-confirm-btn-denied").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("small-alert-denied");
        });
    });


});

function openModal(modalClass) {
    document.querySelectorAll("." + modalClass).forEach(modal => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
}

function closeModal(modalClass) {
    document.querySelectorAll("." + modalClass).forEach(modal => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });
}
