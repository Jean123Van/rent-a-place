import { apiCustomer } from './base';

export const getAllVendors = async (currentPage: number) => {
    try {
        return await apiCustomer.get('/products/find-all/vendors', {
            params: { page: currentPage },
        });
    } catch (e) {
        console.log(e);
    }
};
