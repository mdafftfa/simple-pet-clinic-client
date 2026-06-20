import { api } from './api';

export const getPets = async () => {
    return await api.get('/pet');
};