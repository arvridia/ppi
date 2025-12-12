const API_BASE = 'http://localhost:8080/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao comunicar com a API');
  }

  if (response.status === 204) {
    return null;
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

function setStatus(elementId, message, type = 'info') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = 'status';
  if (type === 'success') {
    el.classList.add('success');
  } else if (type === 'error') {
    el.classList.add('error');
  }
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

function renderTable(tbodyId, data, columns) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!data || data.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = columns.length;
    cell.textContent = 'Nenhum registro encontrado.';
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  data.forEach((item) => {
    const row = document.createElement('tr');
    columns.forEach((col) => {
      const cell = document.createElement('td');
      const value = col.includes('.') ? resolvePath(item, col) : item[col];
      cell.textContent = value ?? '-';
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}
