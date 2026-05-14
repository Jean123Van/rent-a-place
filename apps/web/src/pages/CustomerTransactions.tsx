import { useQuery } from '@tanstack/react-query';
import { getUserBookings } from '../api/products';
import placeholder from '../assets/product-placeholder.jpg';
import type { UserBooking } from '../utils/types';
import { COLORS } from '../styles/colors';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { NoResults } from '../components/Modal/NoResults';
import { BaseContainer } from '../components/container/BaseContainer';

export const CustomerTransactions = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['customer', 'bookings'],
        queryFn: getUserBookings,
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
                {data?.data.map((booking: UserBooking) => (
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
                                {booking.vendor.username}{' '}
                                <span
                                    style={{ color: 'gray' }}
                                >{`(${booking.product.title})`}</span>
                            </span>
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
                                    style={{
                                        fontSize: '15px',
                                        color: 'grey',
                                    }}
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
                                    style={{
                                        fontSize: '15px',
                                        color: 'grey',
                                    }}
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
                                    style={{ fontSize: '15px', color: 'grey' }}
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
