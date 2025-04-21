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
    // let modalradioButtons = document.querySelectorAll("input[name='modal-radio-group']");
    // let modalgenderOthersContainer = document.querySelector(".modal-other-cont");

    // modalradioButtons.forEach(radio => {
    //     radio.addEventListener("change", function () {
    //         let selectedGender = document.querySelector(".modal-radio-other").checked ? "Other" : "";

    //         if (selectedGender === "Other") {
    //             modalgenderOthersContainer.style.display = "flex";
    //         } else {
    //             modalgenderOthersContainer.style.display = "none";
    //         }
    //     });
    // });
    // document.querySelectorAll('.toggleSwitch, .medium-toggleSwitch, .small-toggleSwitch').forEach(function (toggle) {
    //   const isMedium = toggle.classList.contains('medium-toggleSwitch');
    //   const isSmall = toggle.classList.contains('small-toggleSwitch');

    //   // Get related elements based on toggle type
    //   const radioOff = toggle.querySelector(`.${isMedium ? 'medium-' : isSmall ? 'small-' : ''}radio-input-off`);
    //   const radioOn = toggle.querySelector(`.${isMedium ? 'medium-' : isSmall ? 'small-' : ''}radio-input-on`);
    //   const toggleText = toggle.querySelector(`.${isMedium ? 'medium-' : isSmall ? 'small-' : ''}toggleText`);

    //   function toggleRadio(isOn) {
    //     if (isOn) {
    //       toggle.classList.add('on');
    //       toggleText.textContent = 'ON';
    //     } else {
    //       toggle.classList.remove('on');
    //       toggleText.textContent = 'OFF';
    //     }
    //   }

    //   toggle.addEventListener('click', function () {
    //     if (radioOff.checked) {
    //       radioOn.checked = true;
    //       toggleRadio(true);
    //     } else {
    //       radioOff.checked = true;
    //       toggleRadio(false);
    //     }
    //   });

    //   // Set initial state
    //   toggleRadio(radioOn.checked);
    // });
  });