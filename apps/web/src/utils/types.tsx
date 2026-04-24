import type z from 'zod';
import type { signupVendorFormSchema } from './schema/signupVendorFormSchema';

export type SignupVendorInput = z.infer<typeof signupVendorFormSchema>;

export interface SignupInput {
    username: string;
    email: string;
    password: string;
}

export interface SigninVendorInput {
    email: string;
    password: string;
}

export interface SigninInput {
    email: string;
    password: string;
}

export interface CreateProductInput {
    title: string;
    rate: string;
    description: string;
}

export interface ProductData extends CreateProductInput {
    id: string;
    createdAt: Date;
}

export interface VendorData {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
}

export enum UserTypes {
    VENDOR = 'vendor',
    USER = 'user',
}

export enum TokenTypes {
    VENDOR_TOKEN = 'vendor-token',
    CUSTOMER_TOKEN = 'customer-token',
}

export interface BaseBooking {
    additionalNote: string;
    startDate: string;
    endDate: string;
}

export interface BookProductInput extends BaseBooking {
    productId: string;
    vendorId: string;
}

export interface UserBooking extends BaseBooking {
    id: string;
    createdAt: string;
    vendor: VendorData;
    product: ProductData;
}

export interface Customer {
    id: string;
    username: string;
    email: string;
}

export interface VendorBooking extends BaseBooking {
    id: string;
    createdAt: string;
    product: ProductData;
    customer: Customer;
}
