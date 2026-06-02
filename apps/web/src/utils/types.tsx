import type z from 'zod';
import type { signupVendorFormSchema } from './schema/signupVendorFormSchema';
import type { bookProductFormSchema } from './schema/bookProductFormSchema';
import type { createProductFormSchema } from './schema/createProductFormSchema';
import type { signInFormSchema } from './schema/signInFormSchema';

export type SignupVendorInput = z.infer<typeof signupVendorFormSchema>;
export type BookProductForm = z.infer<typeof bookProductFormSchema>;
export type CreateProductInput = z.infer<typeof createProductFormSchema>;
export type SignInVendorInput = z.infer<typeof signInFormSchema>;

export interface SignupInput {
    username: string;
    email: string;
    password: string;
}

export interface SigninInput {
    email: string;
    password: string;
}

export interface ProductImage {
    id: string;
    url: string;
}

export interface ProductData {
    id: string;
    createdAt: string;
    title: string;
    rate: number;
    units: number;
    description: string;
    productImage: ProductImage[];
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

export interface BookProductInput extends BookProductForm {
    productId: string;
    vendorId: string;
}

export interface UserBooking extends BookProductForm {
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

export interface VendorBooking extends BookProductForm {
    id: string;
    createdAt: string;
    product: ProductData;
    customer: Customer;
}
