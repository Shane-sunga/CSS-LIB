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
    let modalradioButtons = document.querySelectorAll("input[name='modal-radio-group']");
    let modalgenderOthersContainer = document.querySelector(".modal-other-cont");

    modalradioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            let selectedGender = document.querySelector(".modal-radio-other").checked ? "Other" : "";

            if (selectedGender === "Other") {
                modalgenderOthersContainer.style.display = "flex";
            } else {
                modalgenderOthersContainer.style.display = "none";
            }
        });
    });
    function toggleRadio(isOn) {
        const toggleSwitch = document.querySelector('.toggleSwitch');
        const toggleText = document.querySelector('.toggleText');
        if (isOn) {
          toggleSwitch.classList.add('on');
          toggleText.textContent = 'ON';
        } else {
          toggleSwitch.classList.remove('on');
          toggleText.textContent = 'OFF';
        }
      }
      document.querySelector('.toggleSwitch').addEventListener('click', function() {
        const radioOff = document.querySelector('.radio-input-off');
        const radioOn = document.querySelector('.radio-input-on');
    
        if (radioOff.checked) {
          radioOn.checked = true;
          toggleRadio(true);
        } else {
          radioOff.checked = true;
          toggleRadio(false);
        }
      });
      function mediumToggleRadio(isOn) {
        const mediumToggleSwitch = document.querySelector('.medium-toggleSwitch');
        const mediumToggleText = document.querySelector('.medium-toggleText');
        if (isOn) {
          mediumToggleSwitch.classList.add('on');
          mediumToggleText.textContent = 'ON';
        } else {
          mediumToggleSwitch.classList.remove('on');
          mediumToggleText.textContent = 'OFF';
        }
      }
      document.querySelector('.medium-toggleSwitch').addEventListener('click', function() {
        const mediumRadioOff = document.querySelector('.medium-radio-input-off');
        const mediumRadioOn = document.querySelector('.medium-radio-input-on');
    
        if (mediumRadioOff.checked) {
          mediumRadioOn.checked = true;
          mediumToggleRadio(true);
        } else {
          mediumRadioOff.checked = true;
          mediumToggleRadio(false);
        }
      });
    
      function smallToggleRadio(isOn) {
        const smallToggleSwitch = document.querySelector('.small-toggleSwitch');
        const smallToggleText = document.querySelector('.small-toggleText');
        if (isOn) {
          smallToggleSwitch.classList.add('on');
          smallToggleText.textContent = 'ON';
        } else {
          smallToggleSwitch.classList.remove('on');
          smallToggleText.textContent = 'OFF';
        }
      }
      document.querySelector('.small-toggleSwitch').addEventListener('click', function() {
        const smallRadioOff = document.querySelector('.small-radio-input-off');
        const smallRadioOn = document.querySelector('.small-radio-input-on');
    
        if (smallRadioOff.checked) {
          smallRadioOn.checked = true;
          smallToggleRadio(true);
        } else {
          smallRadioOff.checked = true;
          smallToggleRadio(false);
        }
      });

});