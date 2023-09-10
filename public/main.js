document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('fileList');
    const fileSelect = document.getElementById('fileSelect');
    const searchInput = document.getElementById('search');
    const dataTable = document.getElementById('dataTable');
  
    // Fetch and display uploaded files
    fetch('/data')
      .then((response) => response.json())
      .then((data) => {
        const { files } = data;
        files.forEach((file) => {
          const option = document.createElement('option');
          option.text = file;
          fileSelect.appendChild(option);
  
          const listItem = document.createElement('li');
          listItem.textContent = file;
          fileList.appendChild(listItem);
        });
      })
      .catch((error) => console.error(error));
  
    // Handle file selection
    fileSelect.addEventListener('change', () => {
      const selectedFile = fileSelect.value;
      if (!selectedFile) return;
  
      fetch(`/data/${selectedFile}`)
        .then((response) => response.json())
        .then((data) => {
          const { headers, rows } = data;
          const tableHeaders = headers.map((header) => `<th>${header}</th>`).join('');
          const tableRows = rows.map((row) => {
            return `<tr>${headers.map((header) => `<td>${row[header]}</td>`).join('')}</tr>`;
          }).join('');
  
          dataTable.innerHTML = `<thead><tr>${tableHeaders}</tr></thead><tbody>${tableRows}</tbody>`;
        })
        .catch((error) => console.error(error));
    });
  
    // Handle search
    searchInput.addEventListener('input', () => {
      const selectedFile = fileSelect.value;
      if (!selectedFile) return;
  
      const searchTerm = searchInput.value.toLowerCase();
      const rows = dataTable.querySelectorAll('tbody tr');
  
      rows.forEach((row) => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
  