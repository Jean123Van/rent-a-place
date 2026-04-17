export interface SignupVendorInput {
    username: string;
    email: string;
    password: string;
}

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
