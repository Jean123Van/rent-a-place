import { UserTypes } from '../../utils/types';
import { BaseHeader } from './BaseHeader';

export const VendorHeader = () => {
    const routes = [
        { title: 'Create product', route: '/create-product' },
        { title: 'Products', route: '/vendor/products' },
        { title: 'Transactions', route: '/vendor/transactions' },
    ];

    return <BaseHeader routes={routes} type={UserTypes.VENDOR} />;
};
