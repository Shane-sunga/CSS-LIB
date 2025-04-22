document.addEventListener("DOMContentLoaded", function () {
    // Regular modals
    document.querySelectorAll(".modal-btn").forEach((modalButton, index) => {
        const modal = document.querySelectorAll(".modal")[index];
        const closeButton = modal.querySelector(".close");

        modal.style.display = "none";

        modalButton.addEventListener("click", function (event) {
            event.preventDefault();
            document.body.style.overflow = "hidden";
            modal.style.display = "flex";
        });

        closeButton.addEventListener("click", function () {
            modal.style.display = "none";
            document.body.style.overflow = "";
        });
    });

   // Slide modals
document.querySelectorAll(".slideLeft-btn-modal").forEach((leftSlideBtn, index) => {
    const slideModal = document.querySelectorAll(".slidemodal-left")[index];
    const closeSlideBtn = slideModal.querySelector(".slide-close-btn");
    const blurOverlay = document.querySelectorAll(".blur-overlay")[index];

    leftSlideBtn.addEventListener("click", () => {
        slideModal.classList.add("open");
        blurOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    closeSlideBtn.addEventListener("click", () => {
        slideModal.classList.remove("open");
        blurOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });

});

});



document.addEventListener("DOMContentLoaded", function () {


    document.querySelectorAll(".medium-btn-modal").forEach(button => {
        button.addEventListener("click", function () {
            openModal("medium-modal");
        });
    });

    document.querySelectorAll(".large-btn-modal").forEach(button => {
        button.addEventListener("click", function () {
            openModal("large-modal");
        });
    });

    document.querySelectorAll(".halfLeft-btn-modal").forEach(button => {
        button.addEventListener("click", function () {
            openModal("half-left-modal");
        });
    });

    document.querySelectorAll(".halfRight-btn-modal").forEach(button => {
        button.addEventListener("click", function () {
            openModal("half-right-modal");
        });
    });

    // Close buttons

    document.querySelectorAll(".close-btn-medium").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("medium-modal");
        });
    });

    document.querySelectorAll(".close-btn-large").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("large-modal");
        });
    });

    document.querySelectorAll(".close-btn-left").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("half-left-modal");
        });
    });

    document.querySelectorAll(".close-btn-right").forEach(button => {
        button.addEventListener("click", function () {
            closeModal("half-right-modal");
        });
    })
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
