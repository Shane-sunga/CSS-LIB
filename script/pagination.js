const data = [];
  for (let i = 1; i <= 4079; i++) {
    data.push({ id: i, name: `Item ${i}` });
  }

  const rowsPerPage = 10;
  let currentPage = 1;

  function displayTable(page) {
    const tableBody = document.querySelector('#dataTable tbody');
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    tableBody.innerHTML = "";

    const sliced = data.slice(start, end);
    sliced.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row.id}</td><td>${row.name}</td>`;
      tableBody.appendChild(tr);
    });

    document.getElementById("tableInfo").textContent = `Showing ${start + 1} to ${Math.min(end, data.length)} of ${data.length} entries`;

    updatePagination(page);
  }

  function updatePagination(page) {
    const pagination = document.getElementById("pagination");
    const pageCount = Math.ceil(data.length / rowsPerPage);
    pagination.innerHTML = "";

    const createPage = (label, value, isActive = false, disabled = false) => {
      const li = document.createElement("li");
      li.textContent = label;
      if (isActive) li.classList.add("active");
      if (disabled) li.classList.add("disabled");
      li.addEventListener("click", () => {
        if (!disabled) {
          currentPage = value;
          displayTable(currentPage);
        }
      });
      pagination.appendChild(li);
    };

    // Prev Button
    createPage("‹", page - 1, false, page === 1);

    const range = 2; // number of pages before and after current
    let startPage = Math.max(1, page - range);
    let endPage = Math.min(pageCount, page + range);

    if (startPage > 1) {
      createPage("1", 1, page === 1);
      if (startPage > 2) {
        const ellipsis = document.createElement("li");
        ellipsis.textContent = "...";
        ellipsis.classList.add("disabled");
        pagination.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      createPage(i, i, page === i);
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        const ellipsis = document.createElement("li");
        ellipsis.textContent = "...";
        ellipsis.classList.add("disabled");
        pagination.appendChild(ellipsis);
      }
      // Jump input
      const inputLi = document.createElement("li");
      const input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = pageCount;
      input.placeholder = "Page";
      input.className = "page-input";

      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
          const val = parseInt(e.target.value);
          if (!isNaN(val) && val >= 1 && val <= pageCount) {
            currentPage = val;
            displayTable(currentPage);
          }
        }
      });

      inputLi.appendChild(input);
      pagination.appendChild(inputLi);
    }

    createPage("›", page + 1, false, page === pageCount);
  }
  displayTable(currentPage);


  document.addEventListener("DOMContentLoaded", function () {
    function closeAllDropdowns() {
      document.querySelectorAll('.header-dropdown-content').forEach(dropdown => {
        dropdown.classList.remove('drop-show');
      });
      document.querySelectorAll('.dropbtn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    }

    // Toggle dropdown on button click
    document.querySelectorAll('.dropbtn').forEach(button => {
      button.addEventListener('click', (e) => {
        const dropdownContent = button.nextElementSibling;
        const isShown = dropdownContent.classList.contains('drop-show');

        closeAllDropdowns();

        if (!isShown) {
          dropdownContent.classList.add('drop-show');
          button.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        } else {
          dropdownContent.classList.remove('drop-show');
          button.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', (e) => {
      if (!e.target.matches('.dropbtn') && !e.target.closest('.header-dropdown-content')) {
        closeAllDropdowns();
      }
    });
  });