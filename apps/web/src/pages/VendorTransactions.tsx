import { useQuery } from '@tanstack/react-query';
import { getVendorBookings } from '../api/products';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import type { VendorBooking } from '../utils/types';
import placeholder from '../assets/product-placeholder.jpg';
import { COLORS } from '../styles/colors';
import { NoResults } from '../components/Modal/NoResults';
import { BaseContainer } from '../components/container/BaseContainer';

export const VendorTransactions = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['vendor', 'transactions'],
        queryFn: getVendorBookings,
    });

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
        return <NoResults />;
    }

    return (
        <div
            style={{
                height: '100%',
                padding: '30px 50px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    maxWidth: '800px',
                    width: '100%',
                    gap: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {data?.data.map((booking: VendorBooking) => (
                    <BaseContainer
                        key={booking.id}
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            alignItems: 'center',
                        }}
                    >
                        <img src={placeholder} style={{ width: '40%' }} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 'bolder',
                                    fontSize: '16px',
                                    marginBottom: '4px',
                                }}
                            >
                                {booking.customer.username}{' '}
                                <span
                                    style={{ color: 'grey' }}
                                >{`(${booking.customer.email})`}</span>
                            </span>
                            <div style={{ marginBottom: '3px' }}>
                                <span
                                    style={{
                                        fontWeight: 'bolder',
                                        fontSize: '16px',
                                    }}
                                >
                                    Product:
                                </span>{' '}
                                <span
                                    style={{
                                        color: 'grey',
                                        fontSize: '15px',
                                    }}
                                >
                                    {booking.product.title}
                                </span>
                            </div>

                            <div>
                                <span
                                    style={{
                                        fontWeight: 'bolder',
                                        fontSize: '16px',
                                    }}
                                >
                                    Start date:{' '}
                                </span>
                                <span
                                    style={{ color: 'grey', fontSize: '15px' }}
                                >
                                    {new Date(
                                        booking.startDate,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ marginBottom: '5px' }}>
                                <span
                                    style={{
                                        fontWeight: 'bolder',
                                        fontSize: '16px',
                                    }}
                                >
                                    End date:{' '}
                                </span>
                                <span
                                    style={{ color: 'grey', fontSize: '15px' }}
                                >
                                    {new Date(
                                        booking.endDate,
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            <div style={{ marginBottom: '5px' }}>
                                <span
                                    style={{
                                        fontWeight: 'bolder',
                                        fontSize: '16px',
                                    }}
                                >
                                    Booked on:{' '}
                                </span>
                                <span
                                    style={{ color: 'grey', fontSize: '15px' }}
                                >
                                    {new Date(
                                        booking.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '3px',
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 'bolder',
                                        fontSize: '16px',
                                    }}
                                >
                                    Notes to the vendor:
                                </span>
                                <span
                                    style={{
                                        border: `2px solid white`,
                                        padding: '5px',
                                        borderRadius: '10px',
                                        color: 'grey',
                                        fontSize: '15px',
                                    }}
                                >
                                    {booking.additionalNote}
                                </span>
                            </div>
                        </div>
                    </BaseContainer>
                ))}
            </div>
        </div>
    );
};
