document.addEventListener("DOMContentLoaded", function () {
    // "Script for modal"
    const modalButton = document.querySelector(".modal-btn");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close");

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
