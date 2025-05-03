//Button script for class section
const backToSectionBtn = document.querySelector(".button-back-to-section");
const targetSection = document.querySelector(".table-hover");

if (backToSectionBtn && targetSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //Remove this if you want to keep the button visible when the section is in view
          // Instantly hide the button when the section is in view
          backToSectionBtn.style.display = "none";
        } else {
          backToSectionBtn.style.display = "flex";
        }
      });
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  observer.observe(targetSection);

  backToSectionBtn.addEventListener("click", () => {
    if (!targetSection) return;

    if (backToSectionBtn.classList.contains("animate")) return;

    backToSectionBtn.classList.add("animate");

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      backToSectionBtn.classList.remove("animate");

      const rect = targetSection.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight);

      if (isInView) {
        backToSectionBtn.style.display = "none";
      }
    }, 1250);
  });
}
//Script for Zip Code
document.addEventListener("DOMContentLoaded", function () {
  const zipInput = document.querySelector(".zip-input");
  const zipMessage = document.querySelector(".zipMessage");

  const selectedFlag = document.querySelector(".selected-flag");
  const flagIcon = selectedFlag?.querySelector("img");
  const countryNameSpan = selectedFlag?.querySelector(".country-name");
  const countryList = document.querySelector(".country-list");

  if (!zipInput || !zipMessage || !selectedFlag || !flagIcon || !countryNameSpan || !countryList) {
    console.warn("Some ZIP selector elements are missing from the DOM.");
    return;
  }

  let selectedCountry = null;

  const zipFormats = {
    "PH": { regex: /^(0[4-9]\d{2}|[1-9]\d{3})$/, name: "Philippines", flag: "https://flagcdn.com/w40/ph.png" },
    "US": { regex: /^\d{5}$/, name: "United States", flag: "https://flagcdn.com/w40/us.png" },
    "JP": { regex: /^\d{3}-\d{4}$/, name: "Japan", flag: "https://flagcdn.com/w40/jp.png" },
    "CA": { regex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
    "GB": { regex: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
    "DE": { regex: /^\d{5}$/, name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
    "FR": { regex: /^\d{5}$/, name: "France", flag: "https://flagcdn.com/w40/fr.png" },
    "AU": { regex: /^\d{4}$/, name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
    "IN": { regex: /^\d{6}$/, name: "India", flag: "https://flagcdn.com/w40/in.png" },
    "MX": { regex: /^\d{5}$/, name: "Mexico", flag: "https://flagcdn.com/w40/mx.png" },
    "BR": { regex: /^\d{5}-\d{3}$/, name: "Brazil", flag: "https://flagcdn.com/w40/br.png" },
    "CN": { regex: /^\d{6}$/, name: "China", flag: "https://flagcdn.com/w40/cn.png" },
    "ID": { regex: /^\d{5}$/, name: "Indonesia", flag: "https://flagcdn.com/w40/id.png" },
    "TH": { regex: /^\d{5}$/, name: "Thailand", flag: "https://flagcdn.com/w40/th.png" },
    "VN": { regex: /^\d{6}$/, name: "Vietnam", flag: "https://flagcdn.com/w40/vn.png" },
    "KR": { regex: /^\d{5}$/, name: "South Korea", flag: "https://flagcdn.com/w40/kr.png" },
    "SG": { regex: /^\d{6}$/, name: "Singapore", flag: "https://flagcdn.com/w40/sg.png" },
    "MY": { regex: /^\d{5}$/, name: "Malaysia", flag: "https://flagcdn.com/w40/my.png" }
  };

  // Populate country list with flags and names
  for (const code in zipFormats) {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${zipFormats[code].flag}" alt="${zipFormats[code].name} flag"> ${zipFormats[code].name}`;
    li.dataset.code = code;
    countryList.appendChild(li);
  }

  // Toggle dropdown visibility
  selectedFlag.addEventListener("click", () => {
    const isVisible = countryList.style.display === "block";
    countryList.style.display = isVisible ? "none" : "block";
  });

  // Handle country selection
  countryList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || !li.dataset.code) return;

    const code = li.dataset.code;
    const data = zipFormats[code];

    selectedCountry = code;
    flagIcon.src = data.flag;
    flagIcon.alt = `${data.name} flag`;
    flagIcon.style.display = "inline-block";
    countryNameSpan.textContent = data.name;
    countryList.style.display = "none";

    // Only validate if input has value
    if (zipInput.value.trim() !== "") {
      validateZIP();
    } else {
      zipMessage.textContent = "";
    }
  });

  // Validate ZIP code on input
  zipInput.addEventListener("input", validateZIP);

  function validateZIP() {
    const zip = zipInput.value.trim();

    if (!selectedCountry) {
      zipMessage.textContent = "Please select a country.";
      zipMessage.style.color = "orange";
      return;
    }

    if (zip === "") {
      zipMessage.textContent = "";
      return;
    }

    const { regex, name } = zipFormats[selectedCountry];

    if (regex.test(zip)) {
      zipMessage.textContent = `✔ Valid ZIP Code (${selectedCountry})`;
      zipMessage.style.color = "green";
    } else {
      zipMessage.textContent = `✖ Invalid ZIP Code for ${name}`;
      zipMessage.style.color = "red";
    }
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      countryList.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function toggleSidebar() {
      document.querySelector(".sidebar").classList.toggle("open-sidebar");
  }

  const toggleButtons = document.querySelectorAll(".menu-toggle, .close-btn");

  toggleButtons.forEach(function (btn) {
      btn.addEventListener("click", toggleSidebar);
  });
});

// Script for sidebar toggle
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".slide-sidebar");
  const toggleBtn = document.querySelector(".slide-toggle-btn");
  const content = document.querySelector(".cont-content"); // To adjust content margin smoothly

  toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");

      // Add a small delay before updating content margin (for smoother animation)
      setTimeout(() => {
          if (sidebar.classList.contains("collapsed")) {
              content.style.marginLeft = "60px";
          } else {
              content.style.marginLeft = "250px";
          }
      }, 100);
  });
});

// Script for toggle buttons that let user select one toggle only at a time
const toggleSwitches = document.querySelectorAll('.toggleSwitch, .medium-toggleSwitch, .small-toggleSwitch');

function turnAllOff() {
    toggleSwitches.forEach(toggle => {
        toggle.classList.remove('on');
        const text = toggle.querySelector('.toggleText, .medium-toggleText, .small-toggleText');
        if (text) text.textContent = 'OFF';
    });
}

toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', () => {
        if (!toggle.classList.contains('on')) {
            turnAllOff();
            toggle.classList.add('on'); 
            const text = toggle.querySelector('.toggleText, .medium-toggleText, .small-toggleText');
            if (text) text.textContent = 'ON';
        } else {
            toggle.classList.remove('on'); 
            const text = toggle.querySelector('.toggleText, .medium-toggleText, .small-toggleText');
            if (text) text.textContent = 'OFF';
        }
    });
});
/*CSS FOR TABLE*/
document.addEventListener("DOMContentLoaded", function () {
  // Loop through each table with the class "colorlib-table"
  document.querySelectorAll(".colorlib-table").forEach((table) => {
    const headerCheckbox = table.querySelector("thead input[type='checkbox']");
    const rowCheckboxes = table.querySelectorAll("tbody input[type='checkbox']");
    const dropdowns = table.querySelectorAll(".status-dropdown");

    // Select/Deselect all checkboxes in this table
    if (headerCheckbox) {
      headerCheckbox.addEventListener("change", function () {
        rowCheckboxes.forEach((checkbox) => {
          checkbox.checked = headerCheckbox.checked;
        });
      });
    }

    // Initialize and monitor each dropdown inside this table
    dropdowns.forEach((dropdown) => {
      setDropdownClass(dropdown);

      dropdown.addEventListener("change", function () {
        setDropdownClass(dropdown);
      });
    });

    // Apply CSS class based on dropdown value
    function setDropdownClass(dropdown) {
      dropdown.classList.remove("default", "active", "pending", "inactive");

      const value = dropdown.value;
      if (!value) {
        dropdown.classList.add("default");
      } else {
        dropdown.classList.add(value);
      }
    }
  });
});
