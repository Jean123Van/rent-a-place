import { useQuery } from '@tanstack/react-query';
import { getAllVendors } from '../api/vendors';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import placeholder from '../assets/product-placeholder.jpg';
import type { VendorData } from '../utils/types';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { SomethingWentWrong } from '../components/Modal/SomethingWentWrong';
import { NoResults } from '../components/Modal/NoResults';
import { ListContainer } from '../components/container/ListContainer';
import { useState } from 'react';
import { PageList } from '../components/pagination/PageList';

export const CustomerProducts = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, data, isError } = useQuery({
        queryKey: ['get-all', 'vendors', currentPage],
        queryFn: () => getAllVendors(currentPage),
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

    if (data?.data.vendors.length === 0) {
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
        <ListContainer>
            {data?.data.vendors.map((vendor: VendorData) => (
                <div
                    style={{
                        border: `1px solid white`,
                        borderRadius: '10px',

                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '250px',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    key={vendor.id}
                >
                    <div
                        style={{
                            width: '50%',
                            height: '100%',
                        }}
                    >
                        <img
                            src={vendor.userImg || placeholder}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
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
                </div>
            ))}
            <PageList
                currentPage={currentPage}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
                totalPages={data?.data.totalPages}
            />
        </ListContainer>
    );
};
