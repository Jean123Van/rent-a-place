import { apiCustomer } from './base';

export const getAllVendors = async () => {
    try {
        return await apiCustomer.get('/products/find-all/vendors');
    } catch (e) {
        console.log(e);
    }
};
