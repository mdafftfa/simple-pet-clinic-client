import { api } from './api';

export const login = async (credentials: any) => {
    return await api.post('/auth/login', credentials);
};

export const register = async (userData: any) => {
    return await api.post('/auth/register', userData);
};