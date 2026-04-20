import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import { COLORS } from '../styles/colors';
import placeholder from '../assets/product-placeholder.png';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';

const Title = ({ value }: { value: string }) => {
    return (
        <span style={{ fontSize: '14px', fontWeight: 'bolder' }}>{value}</span>
    );
};

const Description = ({ value }: { value: string }) => {
    return <span style={{ fontSize: '14px' }}>{value}</span>;
};

export const VendorProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['vendor', 'products'],
        queryFn: getAllProducts,
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
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                padding: '10px',
                gap: '10px',
            }}
        >
            {data?.data.map((product: ProductData) => (
                <div
                    style={{
                        border: `1px solid ${COLORS.skintone}`,
                        borderRadius: '10px',
                        maxWidth: '400px',
                        height: '400px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '10px',
                    }}
                    key={product.id}
                >
                    <img
                        src={placeholder}
                        style={{
                            width: '100%',
                            height: '300px',
                        }}
                    />
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                    >
                        <Title value="Product name" />
                        <Description value={product.title} />

                        <Title value="Description" />
                        <Description value={product.description} />

                        <Title value="Rate" />
                        <Description value={`₱ ${product.rate} / night`} />

                        <Title value="Created at" />
                        <Description
                            value={new Date(product.createdAt).toDateString()}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
