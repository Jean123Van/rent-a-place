import axios from 'axios';
import type { BookProductInput, CreateProductInput } from '../utils/types';
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

export const bookProduct = async (bookProductInput: BookProductInput) => {
    try {
        return await apiCustomer.post('/products/book', bookProductInput);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }

        throw e;
    }
};

export const getUserBookings = async () => {
    try {
        return await apiCustomer.get('/products/bookings/customer');
    } catch (e) {
        console.log(e);
    }
};

export const getVendorBookings = async () => {
    try {
        return await api.get('/products/bookings/vendor');
    } catch (e) {
        console.log(e);
    }
};
