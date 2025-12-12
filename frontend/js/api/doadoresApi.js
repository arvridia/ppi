import { request } from './httpClient.js';

const RESOURCE = '/doadores';

export const listarDoadores = () => request(RESOURCE);

export const buscarDoadorPorId = (id) => request(`${RESOURCE}/${id}`);

export const criarDoador = (payload) =>
  request(RESOURCE, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const atualizarDoador = (id, payload) =>
  request(`${RESOURCE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const removerDoador = (id) =>
  request(`${RESOURCE}/${id}`, {
    method: 'DELETE',
  });
