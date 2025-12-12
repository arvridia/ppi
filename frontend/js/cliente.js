async function carregarClientes() {
  try {
    const clientes = await apiRequest('/clientes');
    renderTable('clientes-body', clientes, [
      'pessoaId',
      'pessoa.nome',
      'pessoa.email',
      'pessoa.telefone',
      'dataCadastro',
    ]);
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
}

document.getElementById('create-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const dataCadastro = document.getElementById('dataCadastro').value;
  const body = {
    pessoaId: Number(document.getElementById('pessoaId').value),
    dataCadastro: dataCadastro || null,
  };

  try {
    const cliente = await apiRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setStatus('create-status', `Cliente criado para pessoa ID ${cliente.pessoaId}.`, 'success');
    carregarClientes();
    event.target.reset();
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
});

document.getElementById('update-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('update-id').value;
  const dataCadastro = document.getElementById('update-dataCadastro').value;
  const pessoaId = document.getElementById('update-pessoaId').value;
  const body = {
    pessoaId: pessoaId ? Number(pessoaId) : null,
    dataCadastro: dataCadastro || null,
  };

  try {
    await apiRequest(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    setStatus('update-status', 'Cliente atualizado com sucesso.', 'success');
    carregarClientes();
  } catch (error) {
    setStatus('update-status', error.message, 'error');
  }
});

document.getElementById('delete-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('delete-id').value;
  try {
    await apiRequest(`/clientes/${id}`, { method: 'DELETE' });
    setStatus('delete-status', 'Cliente removido.', 'success');
    carregarClientes();
    event.target.reset();
  } catch (error) {
    setStatus('delete-status', error.message, 'error');
  }
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', carregarClientes);

carregarClientes();
