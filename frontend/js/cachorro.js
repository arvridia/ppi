async function carregarCachorros() {
  try {
    const cachorros = await apiRequest('/cachorros');
    renderTable('cachorros-body', cachorros, ['id', 'nome', 'raca', 'statusAdocao', 'doador.pessoaId']);
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
}

document.getElementById('create-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const body = {
    nome: document.getElementById('nome').value,
    raca: document.getElementById('raca').value,
    statusAdocao: document.getElementById('status').value,
    doadorId: Number(document.getElementById('doadorId').value),
  };

  try {
    const cachorro = await apiRequest('/cachorros', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setStatus('create-status', `Cachorro criado com ID ${cachorro.id}.`, 'success');
    carregarCachorros();
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
    raca: document.getElementById('update-raca').value,
    statusAdocao: document.getElementById('update-status').value,
    doadorId: Number(document.getElementById('update-doadorId').value),
  };

  try {
    await apiRequest(`/cachorros/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    setStatus('update-status-message', 'Cachorro atualizado com sucesso.', 'success');
    carregarCachorros();
  } catch (error) {
    setStatus('update-status-message', error.message, 'error');
  }
});

document.getElementById('delete-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('delete-id').value;
  try {
    await apiRequest(`/cachorros/${id}`, { method: 'DELETE' });
    setStatus('delete-status', 'Cachorro removido.', 'success');
    carregarCachorros();
    event.target.reset();
  } catch (error) {
    setStatus('delete-status', error.message, 'error');
  }
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', carregarCachorros);

carregarCachorros();
