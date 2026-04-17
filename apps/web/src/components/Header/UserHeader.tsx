import { UserTypes } from '../../utils/types';
import { BaseHeader } from './BaseHeader';

export const UserHeader = () => {
    const routes = [
        { title: 'Products', route: '/customer/vendor-list' },
        { title: 'Transactions', route: '/customer/transactions' },
    ];

    return <BaseHeader routes={routes} type={UserTypes.USER} />;
};
