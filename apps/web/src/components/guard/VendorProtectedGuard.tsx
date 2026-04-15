import { Navigate } from 'react-router-dom';

interface VendorProtectedGuardProps {
    children?: React.ReactNode;
}

export const VendorProtectedGuard = ({
    children,
}: VendorProtectedGuardProps) => {
    const token = localStorage.getItem('vendor-token');

    if (!token) {
        return <Navigate to="/signin/vendor" />;
    }

    return children;
};
