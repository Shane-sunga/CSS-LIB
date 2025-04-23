import "./alerts.js";
import "./button.js";
import "./sidebar.js";
import "./dropdown.js";
import "./date-time.js";
import "./textbox.js";
import "./modal.js";
import "./radio-toggle.js";
import "./textarea.js";
import "./navbar.js";
import "./container.js";
import "./pagination.js";
import "./dashboard.js"


function loadScript(scriptName) {
    let script = document.createElement("script");
    script.src = `script/${scriptName}.js`;
    script.defer = true;
    script.onerror = function () {
        console.error(`Failed to load ${script.src}`);
    };
    document.head.appendChild(script);
}

const scripts = [
    "textbox", "sidebar", "dashboard", "dropdown", "date-time" , "modal", "pagination",
    "radio-toggle", "textarea", "alerts", "button", "navbar", "container"];

scripts.forEach(script => loadScript(script));
