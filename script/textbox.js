document.addEventListener("DOMContentLoaded", function () {
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input[required], select[required], textarea[required]");

        inputs.forEach((input) => {
            if (input.type === "radio") {
                const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = [...radioGroup].some(radio => radio.checked);

                if (!isChecked) {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "2px solid red";
                    });
                    isValid = false;
                } else {
                    radioGroup.forEach(radio => {
                        radio.style.outline = "none";
                    });
                }
            } else if (input.type === "checkbox") {
                if (!input.checked) {
                    input.style.border = "2px solid red";
                    isValid = false;
                } else {
                    input.style.border = "1px solid #d9d9d9";
                }
            } else {
                if (input.value.trim() === "") {
                    input.style.border = "2px solid red";
                    isValid = false;
                } else {
                    input.style.border = "1px solid #ccc";
                }
            }
        });

        return isValid;
    }
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            if (!validateForm(form)) {
                e.preventDefault(); // prevent form submission if not valid
            }
        });
    });


    function handleInputValidation(event) {
        const input = event.target;
        const onlyLetters = ["form-tb-text", "form-tb-middleName"];
        const lettersAndNumbers = ["form-tb-text-number"];
        const onlyNumbers = ["form-tb-number", "form-tb-contNumber"];

        if (onlyLetters.includes(input.classList[0])) {
            input.value = input.value.replace(/[^a-zA-Z ]/g, '');
        } else if (lettersAndNumbers.includes(input.classList[0])) {
            input.value = input.value.replace(/[^a-zA-Z0-9 ]/g, '');
        } else if (onlyNumbers.includes(input.classList[0])) {
            input.value = input.value.replace(/[^0-9]/g, '');
        }
    }

    document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", handleInputValidation);
    });

    // Capitalize the first letter of each word
    document.querySelectorAll("input[type='text'], textarea").forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/\b\w/g, char => char.toUpperCase());
        });
    });
    document.querySelectorAll("input[type='text'], textarea").forEach(input => {
        input.addEventListener("input", handleInputValidation);
    });

    document.querySelector(".form-btn-submit")?.addEventListener("click", function (event) {
        const form = document.querySelector(".form");
        if (form && !validateForm(form)) {
            event.preventDefault();
        }
    });


    // File List with Thumbnails
    const fileInput = document.querySelector(".form-tb-file");
    const fileListCont = document.querySelector(".input-file-list-cont");
    const fileList = document.querySelector(".form-tb-list");
    let storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    fileList.style.padding = "20px"; // Adjust value as needed

    function getFileIcon(fileType) {
        const icons = {
            "application/pdf": "https://cdn-icons-png.flaticon.com/512/337/337946.png", // PDF Icon
            "application/msword": "https://cdn-icons-png.flaticon.com/512/337/337932.png", // Word Icon
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "https://cdn-icons-png.flaticon.com/512/337/337932.png", // Word (DOCX) Icon
            "application/vnd.ms-excel": "https://cdn-icons-png.flaticon.com/512/732/732220.png", // Excel Icon
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "https://cdn-icons-png.flaticon.com/512/732/732220.png", // Excel (XLSX) Icon
            "application/vnd.ms-powerpoint": "https://cdn-icons-png.flaticon.com/512/732/732224.png", // PowerPoint Icon
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "https://cdn-icons-png.flaticon.com/512/732/732224.png", // PowerPoint (PPTX) Icon
            "application/zip": "https://cdn-icons-png.flaticon.com/512/337/337948.png", // ZIP Icon
            "application/x-rar-compressed": "https://cdn-icons-png.flaticon.com/512/337/337948.png", // RAR Icon
            "default": "https://cdn-icons-png.flaticon.com/512/833/833524.png" // Default File Icon
        };
        return icons[fileType] || icons["default"];
    }

    function updateFileList(files) {
        fileList.innerHTML = "";
        files.forEach((file) => {
            let fileContainer = document.createElement("div");
            fileContainer.style.width = "90px";
            fileContainer.style.height = "90px";
            fileContainer.style.overflow = "hidden";
            fileContainer.style.position = "relative";

            let link = document.createElement("a");
            link.href = file.url;
            link.target = "_blank"; // Opens full file in a new tab

            let preview = document.createElement("img");
            preview.style.width = "100%";
            preview.style.height = "100%";
            preview.style.objectFit = "cover";
            preview.style.borderRadius = "8px";
            preview.style.cursor = "pointer";

            if (file.type.startsWith("image/")) {
                // Show image preview
                preview.src = file.url;
            } else if (file.type === "application/pdf") {
                // Show first page of PDF as preview
                preview.src = `https://cdn-icons-png.flaticon.com/512/337/337946.png`;
            } else {
                // Show document icon for other files
                preview.src = getFileIcon(file.type);
            }

            link.appendChild(preview);
            fileContainer.appendChild(link);
            fileList.appendChild(fileContainer);
        });

        fileListCont.style.display = files.length > 0 ? "block" : "none";
    }

    updateFileList(storedFiles);

    fileInput.addEventListener("change", function (event) {
        let newFiles = Array.from(event.target.files).map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type
        }));

        storedFiles = [...storedFiles, ...newFiles];
        localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));

        updateFileList(storedFiles);
    });

    window.addEventListener("beforeunload", function (event) {
        if (storedFiles.length > 0) {
            event.preventDefault();
            event.returnValue = "Are you sure you want to refresh? Uploaded files will be removed.";
        }
    });

    window.addEventListener("unload", function () {
        localStorage.removeItem("uploadedFiles");
    });

    // Getting First Letter of Middle Name and Display to the Middle Initial
    let middleNameInput = document.querySelector(".form-tb-middleName");
    let middleInitialInput = document.querySelector(".form-tb-middleInitial");

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
    // Compare Password and Confirm Password
    const form = document.querySelector(".form");
    const passwordInput = document.querySelector(".form-tb-password");
    const confirmPasswordInput = document.querySelector(".form-tb-confirm-password");

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

    // Fields Input Validations
    const inputs = document.querySelectorAll("input[required], select[required]");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (!this.checkValidity()) {
                this.reportValidity();
            } else {
                this.setCustomValidity("");
            }
        });
    });
    document.querySelector(".form-tb-contNumber").addEventListener("input", function () {
        this.value = this.value.slice(0, 11);
    });

    // Validate Contact Number (10 digits)
    const contactNumber = document.querySelector(".form-tb-contNumber");
    contactNumber.addEventListener("input", function () {
        if (!/^\d{11}$/.test(this.value)) {
            this.setCustomValidity("Contact number must be exactly 11 digits.");
        } else {
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    // Validate Confirm Password
    const password = document.querySelector(".form-tb-password");
    const confirmPassword = document.querySelector(".form-tb-confirm-password");

    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
        confirmPassword.reportValidity();
    });

    // Show/hide password
    document.querySelector(".form-tb-show-password").addEventListener("change", function () {
        const password = document.querySelector(".form-tb-password");
        const type = this.checked ? "text" : "password";
        password.type = type;
    });

    // Two decimal places
    document.querySelector('.form-tb-deci').addEventListener('input', function (e) {
        let value = e.target.value;
        // Ensure the value is a valid number with up to two decimal places
        if (!/^\d*\.?\d{0,2}$/.test(value)) {
            e.target.value = value.slice(0, -1);
        }
    });

    // Select all phone number inputs
    const phoneInputs = document.querySelectorAll(".form-tb-tel");

    if (phoneInputs.length > 0) {
        phoneInputs.forEach((phoneInput) => {
            // Select the error message for the current input
            let errorMsg = document.querySelector(".error");

            // Initialize intlTelInput for each phone input
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: "ph",
                separateDialCode: true,
                preferredCountries: ["ph", "sa", "gb", "jp", "qa"],
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
            });

            // Validation function
            function validatePhone() {
                if (iti.isValidNumber()) {
                    errorMsg.style.display = "none"; // Hide error message
                } else {
                    errorMsg.style.display = "block"; // Show error message
                }
            }

            // Event listener for validation
            phoneInput.addEventListener("blur", validatePhone);
        });
    }

    document.querySelector("submit").addEventListener("click", function () {
        document.querySelectorAll(".form-tb-tel").forEach(input => {
            input.dispatchEvent(new Event("blur")); // Trigger validation on all inputs
        });
    });

    // Add listener to every form
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            // Call your custom validation (optional, if exists)
            const phoneValid = typeof validatePhone === 'function' ? validatePhone() : true;

            // Call main validation
            const formValid = validateForm(form);

            // If either fails, prevent submission
            if (!formValid || !phoneValid) {
                e.preventDefault();
            }
        });
    });




});
document.addEventListener("DOMContentLoaded", function () {
    const zipInputs = document.querySelectorAll(".zip-input");

    // ZIP Code patterns and corresponding country flags
    const zipFormats = {
        "PH": { regex: /^(0[4-9]\d{2}|[1-9]\d{3})$/, flag: "https://flagcdn.com/w40/ph.png" },
        "US": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/us.png" },
        "CA": { regex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, flag: "https://flagcdn.com/w40/ca.png" },
        "GB": { regex: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, flag: "https://flagcdn.com/w40/gb.png" },
        "DE": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/de.png" },
        "FR": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/fr.png" },
        "AU": { regex: /^\d{4}$/, flag: "https://flagcdn.com/w40/au.png" },
        "IN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/in.png" },
        "JP": { regex: /^\d{3}-\d{4}$/, flag: "https://flagcdn.com/w40/jp.png" },
        "MX": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/mx.png" },
        "BR": { regex: /^\d{5}-\d{3}$/, flag: "https://flagcdn.com/w40/br.png" },
        "CN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/cn.png" },
        "ID": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/id.png" },
        "TH": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/th.png" },
        "VN": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/vn.png" },
        "KR": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/kr.png" },
        "SG": { regex: /^\d{6}$/, flag: "https://flagcdn.com/w40/sg.png" },
        "MY": { regex: /^\d{5}$/, flag: "https://flagcdn.com/w40/my.png" }
    };

    // Loop through all ZIP input fields
    zipInputs.forEach(zipInput => {
        const inputGroup = zipInput.closest(".input-group");
        const flagIcon = inputGroup.querySelector(".flag-icon");
        const zipMessage = inputGroup.closest(".form-container").querySelector(".zipMessage");

        zipInput.addEventListener("input", function () {
            let zip = zipInput.value.trim();
            let matchedCountry = null;

            // Check which country's format matches
            for (const country in zipFormats) {
                if (zipFormats[country].regex.test(zip)) {
                    matchedCountry = country;
                    break;
                }
            }

            if (matchedCountry) {
                inputGroup.classList.add("valid");
                inputGroup.classList.remove("invalid");
                flagIcon.src = zipFormats[matchedCountry].flag;
                flagIcon.style.display = "block";
                zipMessage.textContent = `✔ Valid ZIP Code (${matchedCountry})`;
                zipMessage.style.color = "green";
            } else {
                inputGroup.classList.add("invalid");
                inputGroup.classList.remove("valid");
                flagIcon.style.display = "none";
                zipMessage.textContent = "✖ Invalid ZIP Code";
                zipMessage.style.color = "red";
            }
        });
    });

    document.querySelectorAll(".form-tb-text-char").forEach((inputField) => {
        inputField.addEventListener("input", function () {
            let errorMsg = this.nextElementSibling; // Assuming the error message is placed right after the input field

            // Regular expression to allow only special characters (removes letters and numbers)
            let regex = /^[^A-Za-z0-9]+$/;

            if (!regex.test(this.value)) {
                if (errorMsg && errorMsg.classList.contains("error")) {
                    errorMsg.textContent = "Only special characters are allowed!";
                }
                this.value = this.value.replace(/[A-Za-z0-9]/g, ""); // Remove letters and numbers
            } else {
                if (errorMsg && errorMsg.classList.contains("error")) {
                    errorMsg.textContent = "";
                }
            }
        });
    });
    //Text Capitalize, Uppercase, Lowercase
    document.querySelectorAll(".form-tb-text-Capitalize, .form-tb-text-uppercase, .form-tb-text-lowerC").forEach((inputField) => {
        inputField.addEventListener("input", function () {
            let errorMsg = this.nextElementSibling; // Assuming the error message is placed right after the input field

            // Regular expression to allow only letters (A-Z, a-z) and spaces
            let regex = /^[A-Za-z\s]+$/;

            if (!regex.test(this.value)) {
                if (errorMsg && errorMsg.classList.contains("error")) {
                    errorMsg.textContent = "Only alphabetic characters are allowed!";
                }
                this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Remove numbers & special characters
            } else {
                if (errorMsg && errorMsg.classList.contains("error")) {
                    errorMsg.textContent = "";
                }
            }
        });
    });
});
