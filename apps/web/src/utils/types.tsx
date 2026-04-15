export interface SignupVendorInput {
    username: string;
    email: string;
    password: string;
}

export interface SigninVendorInput {
    email: string;
    password: string;
}

export interface CreateProductInput {
    title: string;
    rate: string;
    description: string;
    startDate: string;
    endDate: string;
}
