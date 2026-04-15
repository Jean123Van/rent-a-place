import axios from 'axios';
import type { CreateProductInput } from '../utils/types';
import { api } from './base';

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
