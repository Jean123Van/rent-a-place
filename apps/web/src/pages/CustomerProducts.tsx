import { useQuery } from '@tanstack/react-query';
import { getAllVendors } from '../api/vendors';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import placeholder from '../assets/product-placeholder.png';
import type { VendorData } from '../utils/types';
import { COLORS } from '../styles/colors';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { SomethingWentWrong } from '../components/Modal/SomethingWentWrong';
import { NoResults } from '../components/Modal/NoResults';

export const CustomerProducts = () => {
    const navigate = useNavigate();

    const { isLoading, data, isError } = useQuery({
        queryKey: ['get-all', 'vendors'],
        queryFn: getAllVendors,
    });

    if (isError) {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '40px',
                }}
            >
                <SomethingWentWrong />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LoadingSpinner />
            </div>
        );
    }

    if (data?.data.length === 0) {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '40px',
                }}
            >
                <NoResults />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                padding: '10px',
                gap: '10px',
            }}
        >
            {data?.data.map((vendor: VendorData) => (
                <div
                    style={{
                        border: `1px solid ${COLORS.skintone}`,
                        borderRadius: '10px',
                        maxWidth: '400px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    key={vendor.id}
                >
                    <img
                        src={placeholder}
                        style={{
                            width: '100%',
                            height: '300px',
                        }}
                    />
                    <span style={{ fontWeight: 'bold' }}>
                        {vendor.username}
                    </span>
                    <PrimaryButton
                        onClick={() => {
                            navigate('/customer/vendor-list/' + vendor.id);
                        }}
                    >
                        See Products
                    </PrimaryButton>
                </div>
            ))}
        </div>
    );
};
