import type {
    SigninVendorInput,
    SignupInput,
    SignupVendorInput,
} from '../utils/types';
import { api } from './base';
import axios from 'axios';

export const signupVendor = async (signupVendorInput: SignupVendorInput) => {
    try {
        return await api.post('/auth/signup/vendor', signupVendorInput);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }
    }
};

export const signinVendor = async (
    signinVendorInputData: SigninVendorInput,
) => {
    try {
        return await api.post('/auth/signin/vendor', signinVendorInputData);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }
    }
};

export const signup = async (signupInput: SignupInput) => {
    try {
        return await api.post('/auth/signup', signupInput);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            console.log(e);
        }
    }
};
