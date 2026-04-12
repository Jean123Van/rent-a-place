import type { SignupVendorInput } from '../utils/types';
import { api } from './base';
import axios from 'axios';

export const signupVendor = async (signupVendorInput: SignupVendorInput) => {
    try {
        return api.post('/auth/signup/vendor', signupVendorInput);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }
    }
};
