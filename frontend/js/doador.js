async function carregarDoadores() {
  try {
    const doadores = await apiRequest('/doadores');
    renderTable('doadores-body', doadores, [
      'pessoaId',
      'pessoa.nome',
      'pessoa.email',
      'cpfCnpj',
      'totalDoado',
    ]);
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
}

document.getElementById('create-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const totalDoado = document.getElementById('totalDoado').value;
  const body = {
    pessoaId: Number(document.getElementById('pessoaId').value),
    cpfCnpj: document.getElementById('cpfCnpj').value,
    totalDoado: totalDoado ? Number(totalDoado) : null,
  };

  try {
    const doador = await apiRequest('/doadores', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    setStatus('create-status', `Doador criado para pessoa ID ${doador.pessoaId}.`, 'success');
    carregarDoadores();
    event.target.reset();
  } catch (error) {
    setStatus('create-status', error.message, 'error');
  }
});

document.getElementById('update-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('update-id').value;
  const totalDoado = document.getElementById('update-totalDoado').value;
  const pessoaId = document.getElementById('update-pessoaId').value;
  const body = {
    pessoaId: pessoaId ? Number(pessoaId) : null,
    cpfCnpj: document.getElementById('update-cpfCnpj').value,
    totalDoado: totalDoado ? Number(totalDoado) : null,
  };

  try {
    await apiRequest(`/doadores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    setStatus('update-status', 'Doador atualizado com sucesso.', 'success');
    carregarDoadores();
  } catch (error) {
    setStatus('update-status', error.message, 'error');
  }
});

document.getElementById('delete-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('delete-id').value;
  try {
    await apiRequest(`/doadores/${id}`, { method: 'DELETE' });
    setStatus('delete-status', 'Doador removido.', 'success');
    carregarDoadores();
    event.target.reset();
  } catch (error) {
    setStatus('delete-status', error.message, 'error');
  }
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', carregarDoadores);

carregarDoadores();
