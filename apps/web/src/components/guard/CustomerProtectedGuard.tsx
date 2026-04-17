import { Navigate } from 'react-router-dom';

interface CustomerProtectedGuardProps {
    children?: React.ReactNode;
}

export const CustomerProtectedGuard = ({
    children,
}: CustomerProtectedGuardProps) => {
    const token = localStorage.getItem('customer-token');

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};
