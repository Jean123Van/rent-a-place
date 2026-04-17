import axios from 'axios';
import type { CreateProductInput } from '../utils/types';
import { api, apiCustomer } from './base';

export const createProduct = async (createProductInput: CreateProductInput) => {
    try {
        return await api.post('/products/create', {
            ...createProductInput,
            rate: Number(createProductInput.rate),
        });
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }
    }
};

export const getAllProducts = async () => {
    try {
        return await api.get('/products/find-all');
    } catch (e) {
        console.log(e);
    }
};

export const getProductsByVendor = async (vendorId: string) => {
    try {
        return await apiCustomer.get(`products/vendor/${vendorId}`);
    } catch (e) {
        console.log(e);
    }
};
