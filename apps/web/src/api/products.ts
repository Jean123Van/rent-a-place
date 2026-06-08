import axios from 'axios';
import type { BookProductInput } from '../utils/types';
import { api, apiCustomer } from './base';

export const createProduct = async (createProductInput: FormData) => {
    try {
        return await api.post('/products/create', createProductInput);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }

        throw e;
    }
};

export const getAllProducts = async (currentPage: number) => {
    try {
        return await api.get('/products/find-all', {
            params: { page: currentPage },
        });
    } catch (e) {
        console.log(e);
    }
};

export const getProductsByVendor = async (
    vendorId: string,
    currentPage?: number,
) => {
    try {
        return await apiCustomer.get(`products/vendor/${vendorId}`, {
            params: { page: currentPage },
        });
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

export const getVendorBookings = async (currentPage: number) => {
    try {
        return await api.get('/products/bookings/vendor', {
            params: { page: currentPage },
        });
    } catch (e) {
        console.log(e);
    }
};
