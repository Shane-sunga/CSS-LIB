document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function () {
        // === DROPDOWN SELECTIONS ===
        $(document).on('click', '.dropdown-item', function () {
            const selectedText = $(this).text();
            const dropdown = $(this).closest('.dropdown');
            dropdown.find('.dropdown-select p').text(selectedText);
            dropdown.find('.dropdown-select').attr('data-value', selectedText);
        });

        // === "OTHER" OPTION SELECTION ===
        $(document).on('click', '.dropdown-item-other', function () {
            const selectedValue = $(this).data('value');
            const container = $(this).closest('.input-cont-drop');

            container.find('.form-dropdown-other')
                .text(selectedValue)
                .attr('data-value', selectedValue);

            container.find('.form-dropdown-input').val('');
        });

        // === LIVE INPUT UPDATE FOR "OTHER" ===
        $(document).on('input', '.form-dropdown-input', function () {
            const customValue = $(this).val();
            const container = $(this).closest('.input-cont-drop');

            container.find('.form-dropdown-other')
                .text(customValue || 'Select an option')
                .attr('data-value', customValue);
        });

        // === TOGGLE SWITCH LIVE CHANGE ===
        $(document).on('change', '.toggleSwitch input[type="radio"], .medium-toggleSwitch input[type="radio"], .small-toggleSwitch input[type="radio"]', function () {
            const toggleContainer = $(this).closest('.toggleSwitch, .medium-toggleSwitch, .small-toggleSwitch');
            if (toggleContainer.find('input[type="radio"].radio-input-on, .medium-radio-input-on, .small-radio-input-on').is(':checked')) {
                toggleContainer.css('border', '');
            }
        });

        $('.form').each(function () {
            const currentForm = $(this);

            currentForm.find('.form-btn-submit').on('click', function (e) {
                e.preventDefault();

                let isValid = true;
                currentForm.find('[required]').css('border', '');

                currentForm.find('[required]').each(function () {
                    const $field = $(this);



                    // === ZIP CODE VALIDATION ===
                    if ($field.hasClass('zip-input')) {
                        const inputGroup = $field.closest('.input-group');
                        if (!$field.val()) {
                            inputGroup.css('border', '2px solid red');
                            isValid = false;
                        } else {
                            inputGroup.css('border', '');
                        }
                    }

                    if ($field.hasClass('dropdown-select') || $field.hasClass('form-dropdown-other')) {
                        if (!$field.attr('data-value')) {
                            $field.css('border', '2px solid red');
                            isValid = false;
                        }
                    } else if (
                        $field.hasClass('toggleSwitch') ||
                        $field.hasClass('medium-toggleSwitch') ||
                        $field.hasClass('small-toggleSwitch')
                    ) {
                        const isChecked = $field.find('input[type="radio"].radio-input-on, .medium-radio-input-on, .small-radio-input-on').is(':checked');
                        if (!isChecked) {
                            $field.css('border', '2px solid red');
                            isValid = false;
                        }
                    } else if (!$field.val()) {
                        $field.css('border', '2px solid red');
                        isValid = false;
                    }

                    if ($field.is(':checkbox')) {
                        if (!$field.is(':checked')) {
                            $field.css('border', '2px solid red');
                            isValid = false;
                        } else {
                            $field.css('border', '1px solid #d9d9d9');
                        }
                    }

                    if ($field.is(':radio')) {
                        const radioName = $field.attr('name');
                        const radioGroup = currentForm.find(`input[name="${radioName}"]`);
                        const isChecked = radioGroup.is(':checked');

                        if (!isChecked) {
                            radioGroup.each(function () {
                                $(this).css('outline', '2px solid red');
                            });
                            isValid = false;
                        } else {
                            radioGroup.each(function () {
                                $(this).css('outline', 'none');
                            });
                        }
                    }

                    if ($field.hasClass('form-tb-tel')) {
                        const itiContainer = $field.closest('.iti');
                        const iti = window.intlTelInputGlobals.getInstance($field[0]);
                        if (!iti.isValidNumber()) {
                            itiContainer.css('border', '2px solid red');
                            isValid = false;
                        } else {
                            itiContainer.css('border', '');
                        }
                    }
                });
            });
        });

        // === RADIO BUTTON GROUP VALIDATION ===
        $(document).on('change', 'input[type="radio"]', function () {
            const radioName = $(this).attr('name');
            const radioGroup = $(`input[name="${radioName}"]`);

            // Check if any radio in the group is selected
            if (radioGroup.is(':checked')) {
                // Remove red outline if any was previously applied
                radioGroup.each(function () {
                    $(this).css('outline', 'none');
                });
            }
        });


        // === REAL-TIME VALIDATION TO REMOVE RED BORDER ===
        $(document).on('input change', '[required]', function () {
            const $field = $(this);

            // Remove red border for text input and similar fields
            if ($field.val() && !$field.is(':checkbox') && !$field.is(':radio')) {
                $field.css('border', '');
            }

            // Dropdown validation
            if ($field.hasClass('dropdown-select') || $field.hasClass('form-dropdown-other')) {
                if ($field.attr('data-value')) {
                    $field.css('border', '');
                }
            }

            // Toggle switch validation
            if (
                $field.hasClass('toggleSwitch') ||
                $field.hasClass('medium-toggleSwitch') ||
                $field.hasClass('small-toggleSwitch')
            ) {
                const isChecked = $field.find('input[type="radio"].radio-input-on, .medium-radio-input-on, .small-radio-input-on').is(':checked');
                if (isChecked) {
                    $field.css('border', '');
                }
            }

            // Checkbox validation
            if ($field.is(':checkbox')) {
                if ($field.is(':checked')) {
                    $field.css('border', '1px solid #d9d9d9');
                }
            }

            // Phone number validation
            if ($field.hasClass('form-tb-tel')) {
                const itiContainer = $field.closest('.iti');
                const iti = window.intlTelInputGlobals.getInstance($field[0]);
                if (iti.isValidNumber()) {
                    itiContainer.css('border', '');
                }
            }
        });


        // === TOGGLE SWITCHES (ON/OFF TOGGLE FUNCTION) ===
        $('.toggleSwitch, .medium-toggleSwitch, .small-toggleSwitch').each(function () {
            const toggle = $(this);
            const isMedium = toggle.hasClass('medium-toggleSwitch');
            const isSmall = toggle.hasClass('small-toggleSwitch');
            const prefix = isMedium ? 'medium-' : isSmall ? 'small-' : '';

            const radioOff = toggle.find(`.${prefix}radio-input-off`);
            const radioOn = toggle.find(`.${prefix}radio-input-on`);
            const toggleText = toggle.find(`.${prefix}toggleText`);

            function updateToggleUI(isOn) {
                if (isOn) {
                    toggle.addClass('on');
                    toggleText.text('ON');
                } else {
                    toggle.removeClass('on');
                    toggleText.text('OFF');
                }
            }

            toggle.on('click', function () {
                if (radioOff.prop('checked')) {
                    radioOn.prop('checked', true).trigger('change');
                    updateToggleUI(true);
                } else {
                    radioOff.prop('checked', true).trigger('change');
                    updateToggleUI(false);
                }
            });

            // Set initial state
            updateToggleUI(radioOn.prop('checked'));
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

        files.forEach((file, index) => {
            let fileContainer = document.createElement("div");
            fileContainer.style.width = "160px";
            fileContainer.style.height = "200px"; // Increased to make space for filename
            fileContainer.style.overflow = "hidden";
            fileContainer.style.position = "relative";
            fileContainer.style.margin = "5px";
            fileContainer.style.display = "inline-block";
            fileContainer.style.verticalAlign = "top";

            // Delete (X) button
            let deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "&times;";
            deleteBtn.style.position = "absolute";
            deleteBtn.style.top = "2px";
            deleteBtn.style.right = "5px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.fontSize = "16px";
            deleteBtn.style.color = "black";
            deleteBtn.style.background = "white";
            deleteBtn.style.borderRadius = "50%";
            deleteBtn.style.padding = "2px 7px";
            deleteBtn.style.zIndex = "10";

            deleteBtn.addEventListener("click", function () {
                storedFiles.splice(index, 1);
                localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));
                updateFileList(storedFiles);
            });



            // File preview
            let link = document.createElement("a");
            link.href = file.url;
            link.target = "_blank";

            let preview = document.createElement("img");
            preview.style.width = "100%";
            preview.style.height = "140px";
            preview.style.objectFit = "cover";
            preview.style.borderRadius = "8px";
            preview.style.cursor = "pointer";

            preview.src = file.type.startsWith("image/") ? file.url : getFileIcon(file.type);
            link.appendChild(preview);

            // File name
            let fileName = document.createElement("p");
            fileName.textContent = file.name;
            fileName.style.margin = "5px 0 0 0";
            fileName.style.fontSize = "12px";
            fileName.style.textAlign = "center";
            fileName.style.overflow = "hidden";
            fileName.style.textOverflow = "ellipsis";
            fileName.style.whiteSpace = "nowrap";
            fileName.style.width = "100%";

            fileContainer.appendChild(deleteBtn);
            fileContainer.appendChild(link);
            fileContainer.appendChild(fileName); // Add file name after preview
            fileList.appendChild(fileContainer);
        });

        // Add icon and drop zone
        let addContainer = document.createElement("div");
        addContainer.style.width = "160px";
        addContainer.style.height = "200px";
        addContainer.style.margin = "5px";
        addContainer.style.display = "inline-flex";
        addContainer.style.alignItems = "center";
        addContainer.style.justifyContent = "center";
        addContainer.style.flexDirection = "column";
        addContainer.style.border = "2px dashed #aaa";
        addContainer.style.borderRadius = "8px";
        addContainer.style.cursor = "pointer";
        addContainer.style.color = "#aaa";
        addContainer.style.fontSize = "48px";
        addContainer.style.transition = "border-color 0.3s ease";
        addContainer.setAttribute("id", "drop-zone");

        let plusIcon = document.createElement("div");
        plusIcon.innerHTML = "+";
        addContainer.appendChild(plusIcon);

        let smallText = document.createElement("small");
        smallText.innerText = "Add files";
        smallText.style.fontSize = "12px";
        addContainer.appendChild(smallText);

        fileList.appendChild(addContainer);

        // Click to trigger file input
        addContainer.addEventListener("click", () => fileInput.click());

        // Drag & Drop
        addContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
            addContainer.style.borderColor = "#333";
        });

        addContainer.addEventListener("dragleave", function () {
            addContainer.style.borderColor = "#aaa";
        });

        addContainer.addEventListener("drop", function (e) {
            e.preventDefault();
            addContainer.style.borderColor = "#aaa";

            const droppedFiles = Array.from(e.dataTransfer.files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type
            }));

            storedFiles = [...storedFiles, ...droppedFiles];
            localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));
            updateFileList(storedFiles);
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
            // Get the error message for this specific input
            const errorMsg = phoneInput.closest(".input-cont")?.querySelector(".error");

            // Initialize intlTelInput instance for this specific input
            const iti = window.intlTelInput(phoneInput, {
                initialCountry: "ph",
                separateDialCode: true,
                preferredCountries: ["ph", "sa", "gb", "jp", "qa"],
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
            });

            // Store the instance on the input for later access
            phoneInput._iti = iti;

            // Validation function for this input only
            phoneInput.addEventListener("blur", function () {
                if (iti.isValidNumber()) {
                    errorMsg.style.display = "none";
                } else {
                    errorMsg.style.display = "block";
                }
            });
        });
    }

    // Submit button: manually trigger validation on all inputs
    document.querySelector(".form-btn-submit").addEventListener("click", function () {
        phoneInputs.forEach((input) => {
            input.dispatchEvent(new Event("blur")); // triggers validation for each input separately
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
