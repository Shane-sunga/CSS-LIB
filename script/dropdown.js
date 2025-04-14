document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.input-cont-drop').forEach(container => {
        const customSelect = container.querySelector('.form-dropdown-other');
        const dropdownOptions = container.querySelector('.dropdown-options-other');
        const allOptions = container.querySelectorAll('.dropdown-item-other');
        const allOtherOptions = container.querySelectorAll('.other-option');
    
        // Toggle dropdown
        customSelect.addEventListener('click', () => {
          dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
        });
    
        // Regular options
        allOptions.forEach(option => {
          option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            customSelect.textContent = value;
            dropdownOptions.style.display = 'none';
    
            // Reset all other inputs
            allOtherOptions.forEach(o => {
              o.classList.remove('selected');
              const input = o.querySelector('input');
              input.style.display = 'none';
              input.value = '';
            });
          });
        });
    
        // Other options (for each)
        allOtherOptions.forEach(otherOption => {
          const input = otherOption.querySelector('input');
    
          otherOption.addEventListener('click', (e) => {
            e.stopPropagation();
    
            // Reset others
            allOtherOptions.forEach(o => {
              if (o !== otherOption) {
                o.classList.remove('selected');
                o.querySelector('input').style.display = 'none';
                o.querySelector('input').value = '';
              }
            });
    
            otherOption.classList.add('selected');
            input.style.display = 'inline-block';
            input.focus();
            customSelect.textContent = 'Other :';
          });
    
          input.addEventListener('input', () => {
            customSelect.textContent = 'Other : ' + input.value;
          });
        });
    
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!container.contains(e.target)) {
            dropdownOptions.style.display = 'none';
          }
        });
      });
});