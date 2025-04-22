document.addEventListener("DOMContentLoaded", function () {
    let radioButtons = document.querySelectorAll("input[name='form-radio-group']");
    let genderOthersContainer = document.querySelector(".input-other-cont");

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            let selectedGender = document.querySelector(".form-radio-other").checked ? "Other" : "";

            if (selectedGender === "Other") {
                genderOthersContainer.style.display = "flex";
            } else {
                genderOthersContainer.style.display = "none";
            }
        });
    });


  });