import { request } from './httpClient.js';

const RESOURCE = '/clientes';

export const listarClientes = () => request(RESOURCE);

export const buscarClientePorId = (id) => request(`${RESOURCE}/${id}`);

export const criarCliente = (payload) =>
  request(RESOURCE, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const atualizarCliente = (id, payload) =>
  request(`${RESOURCE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const removerCliente = (id) =>
  request(`${RESOURCE}/${id}`, {
    method: 'DELETE',
  });
