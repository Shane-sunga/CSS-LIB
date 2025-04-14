document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".form-tb-textarea");
    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fontSizeSelect = document.querySelector(".font-size");
    
    // Populate font size options dynamically
    for (let i = 4; i <= 75; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${i}px`;
        if (i === 12) option.selected = true;
        fontSizeSelect.appendChild(option);
    }

    // Change font size function
    function changeFontSize(size) {
        document.execCommand("styleWithCSS", false, true);
        document.execCommand("fontSize", false, "5");
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.style.fontSize = size + "px";
            span.appendChild(range.extractContents());
            range.insertNode(span);
        }
    }

    // Event listener for font size change
    document.querySelectorAll(".font-size").forEach(select => {
        select.addEventListener("change", function () {
            changeFontSize(this.value);
        });
    });

    document.querySelector(".fontFamily").addEventListener("change", function () {
        changeFontFamily(this.value);
    });

    // Format Buttons
    document.querySelectorAll(".format-btn").forEach(button => {
        button.addEventListener("click", function () {
            formatText(this.dataset.command);
        });
    });

    // Text Color and Highlight Buttons
    document.querySelector(".textColorBtn").addEventListener("click", function () {
        toggleColorPicker(".textColorPicker");
    });

    document.querySelector(".highlightBtn").addEventListener("click", function () {
        toggleColorPicker(".highlightPicker");
    });

    // Color Picker Change
    document.querySelector(".textColorPicker input").addEventListener("change", function () {
        changeTextColor(this.value);
    });

    document.querySelector(".highlightPicker input").addEventListener("change", function () {
        changeHighlightColor(this.value);
    });

    // Auto-resize editor based on content
    editor.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    // Undo and Redo functionality
    document.querySelector(".undo").addEventListener("click", function () {
        document.execCommand('undo');
    });

    document.querySelector(".redo").addEventListener("click", function () {
        document.execCommand('redo');
    });
});

// Update font family
function changeFontFamily(font) {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontName", false, font);
}

// Format text based on command
function formatText(command) {
    document.execCommand(command, false, null);
}

// Change text color
function changeTextColor(color) {
    document.execCommand("foreColor", false, color);
    document.querySelector(".textColorIcon").style.color = color;
    document.querySelector(".textColorIcon").style.borderColor = color;
    document.querySelector(".textColorPicker").style.display = "none";
}

// Change highlight color
function changeHighlightColor(color) {
    document.execCommand("hiliteColor", false, color);
    document.querySelector(".highlightIcon").style.backgroundColor = color;
    document.querySelector(".highlightPicker").style.display = "none";
}

// Toggle color picker visibility
function toggleColorPicker(pickerClass) {
    document.querySelectorAll(".color-picker-container").forEach(picker => {
        picker.style.display = "none";
    });

    const picker = document.querySelector(pickerClass);
    picker.style.display = picker.style.display === "block" ? "none" : "block";
    const button = document.querySelector(pickerClass).previousElementSibling;
    if (picker.style.display === "block") {
        picker.style.top = button.offsetTop + button.offsetHeight + "px";
        picker.style.left = button.offsetLeft + "px";
    }
}
