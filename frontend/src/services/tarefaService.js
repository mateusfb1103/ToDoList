import axios from 'axios';

const API_URL = '/api/tarefas'; 

export const createTarefa = (tarefa) => {
    return axios.post(API_URL, tarefa);
};

export const getTarefas = (filtros = {}) => {
    return axios.get(API_URL, { params: filtros });
};

export const updateTarefa = (id, tarefa) => {
    return axios.put(`${API_URL}/${id}`, tarefa);
};

export const deleteTarefa = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const markAsConcluida = (id) => {
    return axios.patch(`${API_URL}/${id}/concluir`);
};

export const updateStatus = (id, newStatus) => {
    return axios.get(`${API_URL}/${id}`).then(response => {
        const tarefa = response.data;
        tarefa.status = newStatus;
        return axios.put(`${API_URL}/${id}`, tarefa);
    });
};