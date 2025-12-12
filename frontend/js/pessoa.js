async function carregarPessoas() {
  try {
    const pessoas = await apiRequest('/pessoas');
    renderTable('pessoas-body', pessoas, ['id', 'nome', 'email', 'telefone', 'endereco']);
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
}

document.getElementById('create-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const body = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    endereco: document.getElementById('endereco').value,
  };

  try {
    const pessoa = await apiRequest('/pessoas', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setStatus('create-status', `Pessoa criada com ID ${pessoa.id}.`, 'success');
    carregarPessoas();
    event.target.reset();
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
});

document.getElementById('update-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('update-id').value;
  const body = {
    nome: document.getElementById('update-nome').value,
    email: document.getElementById('update-email').value,
    telefone: document.getElementById('update-telefone').value,
    endereco: document.getElementById('update-endereco').value,
  };

  try {
    await apiRequest(`/pessoas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    setStatus('update-status', 'Pessoa atualizada com sucesso.', 'success');
    carregarPessoas();
  } catch (error) {
    setStatus('update-status', error.message, 'error');
  }
});

document.getElementById('delete-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('delete-id').value;
  try {
    await apiRequest(`/pessoas/${id}`, { method: 'DELETE' });
    setStatus('delete-status', 'Pessoa removida.', 'success');
    carregarPessoas();
    event.target.reset();
  } catch (error) {
    setStatus('delete-status', error.message, 'error');
  }
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', carregarPessoas);

carregarPessoas();
