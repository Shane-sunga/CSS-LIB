document.addEventListener("DOMContentLoaded", function () {
    // "Script for modal"
    const submitButton = document.querySelector(".modal-btn");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close");

    modal.style.display = "none";

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        modal.style.display = "flex";
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    // Compare Password and Confirm Password in Modal
    const form = document.querySelector(".modal-form");
    const passwordInput = document.querySelector(".modal-tb-password");
    const confirmPasswordInput = document.querySelector(".modal-tb-confirm-password");

    form.addEventListener("submit", function (event) {
        console.log("Form submitted");

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        passwordInput.style.border = "1px solid #ccc";
        confirmPasswordInput.style.border = "1px solid #ccc";

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            alert("Passwords do not match.");
            event.preventDefault();

            // Highlight the fields in red
            passwordInput.style.border = "2px solid red";
            confirmPasswordInput.style.border = "2px solid red";
            return;
        }

        alert("Form submitted successfully!");

        setTimeout(() => {
            location.reload();
        }, 3000);
    });
    const inputs = document.querySelectorAll("input[required], select[required]");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (!this.checkValidity()) {
                this.reportValidity();
            } else {
                this.setCustomValidity("");
            }
        });
        // Show/hide password
        document.querySelector(".modal-tb-show-password").addEventListener("change", function () {
            const password = document.querySelector(".modal-tb-password");
            const type = this.checked ? "text" : "password";
            password.type = type;
        });
    });
    // Validate Confirm Password
    const password = document.querySelector(".modal-tb-password");
    const confirmPassword = document.querySelector(".modal-tb-confirmPassword");
    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });
    // Show/hide password
    document.querySelector(".modal-tb-show-password").addEventListener("change", function () {
        const password = document.querySelector(".modal-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });

    // text area in modal
    const textarea = document.querySelector(".modal-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
    document.querySelector(".modal-tb-contNumber").addEventListener("input", function () {
        this.value = this.value.slice(0, 11);
    });

});
// Getting first letter of middle name
document.addEventListener("DOMContentLoaded", function () {
    let middleNameInput = document.querySelector(".modal-tb-middleName");
    let middleInitialInput = document.querySelector(".modal-tb-middleInitial");
    middleNameInput.addEventListener("input", function () {
        let middleName = middleNameInput.value.trim();
        if (middleName.length > 0) {
            let initials = middleName
                .split(" ")
                .filter(word => word.length > 0)
                .map(word => word.charAt(0).toUpperCase())
                .join("");
            middleInitialInput.value = initials;
        } else {
            middleInitialInput.value = "";
        }
    });

    // Make the first letter of each word uppercase
    let inputs = document.querySelectorAll("input[type='text'], textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
        });
    });

    // Compare Password and Confirm Password
    const form = document.querySelector(".modal");
    const passwordInput = document.querySelector(".modal-tb-password");
    const confirmPasswordInput = document.querySelector(".modal-tb-confirmPassword");

    form.addEventListener("submit", function (event) {
        console.log("Form submitted");

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Reset border styles
        passwordInput.style.border = "1px solid #ccc";
        confirmPasswordInput.style.border = "1px solid #ccc";

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            alert("Passwords do not match.");
            event.preventDefault();
            // Highlight the fields in red
            passwordInput.style.border = "2px solid red";
            confirmPasswordInput.style.border = "2px solid red";
            return;
        }
        alert("Form submitted successfully!");
        setTimeout(() => {
            location.reload();
        }, 3000);
    });


});

      document.addEventListener("DOMContentLoaded", function () {
            // Button to Open Modals
            document.querySelectorAll(".small-btn-modal").forEach(button => {
                button.addEventListener("click", function () {
                    openModal("small-modal");
                });
            });

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
            document.querySelectorAll(".alert-confirm-btn").forEach(button => {
                button.addEventListener("click", function () {
                    closeModal("small-modal");
                });
            });

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
            });
        }
        

