import axios from 'axios';
import { API_URL } from '../utils/environmentVar';
import { TokenTypes } from '../utils/types';

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TokenTypes.VENDOR_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiCustomer = axios.create({
    baseURL: API_URL,
});

apiCustomer.interceptors.request.use((config) => {
    const token = localStorage.getItem(TokenTypes.CUSTOMER_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
