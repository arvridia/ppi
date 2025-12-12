import { request } from './httpClient.js';

const RESOURCE = '/cachorros';

export const listarCachorros = () => request(RESOURCE);

export const buscarCachorroPorId = (id) => request(`${RESOURCE}/${id}`);

export const criarCachorro = (payload) =>
  request(RESOURCE, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const atualizarCachorro = (id, payload) =>
  request(`${RESOURCE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const removerCachorro = (id) =>
  request(`${RESOURCE}/${id}`, {
    method: 'DELETE',
  });
