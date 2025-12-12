const API_BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMessage = `Erro ${response.status}`;

    try {
      const body = await response.json();
      if (body && body.message) {
        errorMessage = body.message;
      }
    } catch (error) {
      // ignore JSON parse errors and keep default message
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { request };
