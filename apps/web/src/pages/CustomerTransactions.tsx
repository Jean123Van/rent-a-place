import { useQuery } from '@tanstack/react-query';
import { getUserBookings } from '../api/products';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import placeholder from '../assets/product-placeholder.png';
import type { UserBooking } from '../utils/types';
import { COLORS } from '../styles/colors';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';

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
                    <ShadowedContainer
                        key={booking.id}
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={placeholder}
                            style={{ height: '70px', width: '70px' }}
                        />
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
                                    fontSize: '18px',
                                    marginBottom: '4px',
                                }}
                            >
                                {booking.vendor.username}{' '}
                                {`(${booking.product.title})`}
                            </span>
                            <div>
                                <span style={{ fontWeight: 'bolder' }}>
                                    Start date:{' '}
                                </span>
                                <span>
                                    {new Date(
                                        booking.startDate,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ marginBottom: '5px' }}>
                                <span style={{ fontWeight: 'bolder' }}>
                                    End date:{' '}
                                </span>
                                <span>
                                    {new Date(
                                        booking.endDate,
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            <div style={{ marginBottom: '5px' }}>
                                <span style={{ fontWeight: 'bolder' }}>
                                    Booked on:{' '}
                                </span>
                                <span>
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
                                <span style={{ fontWeight: 'bolder' }}>
                                    Notes to the vendor:
                                </span>
                                <span
                                    style={{
                                        border: `2px solid ${COLORS.skintone}`,
                                        padding: '5px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    {booking.additionalNote}
                                </span>
                            </div>
                        </div>
                    </ShadowedContainer>
                ))}
            </div>
        </div>
    );
};
