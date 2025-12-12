import { request } from './httpClient.js';

const RESOURCE = '/pessoas';

export const listarPessoas = () => request(RESOURCE);

export const buscarPessoaPorId = (id) => request(`${RESOURCE}/${id}`);

export const criarPessoa = (payload) =>
  request(RESOURCE, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const atualizarPessoa = (id, payload) =>
  request(`${RESOURCE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const removerPessoa = (id) =>
  request(`${RESOURCE}/${id}`, {
    method: 'DELETE',
  });
