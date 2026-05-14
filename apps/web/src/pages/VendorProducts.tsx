import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import placeholder from '../assets/product-placeholder.jpg';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';

interface RowDetailsProps {
    title: string;
    value: string;
}

const RowDetails = ({ title, value }: RowDetailsProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <span
                style={{
                    fontSize: '16px',
                    fontWeight: 'bolder',
                    color: 'white',
                }}
            >
                {title}
            </span>
            <span style={{ fontSize: '15px', color: 'grey' }}>{value}</span>
        </div>
    );
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
                display: 'flex',
                padding: '50px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    border: '2px solid white',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '700px',
                    padding: '10px',
                    borderRadius: '10px',
                    gap: '10px',
                }}
            >
                {data?.data.map((product: ProductData) => (
                    <div
                        style={{
                            border: `1px solid white`,
                            borderRadius: '10px',

                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: '10px',
                        }}
                        key={product.id}
                    >
                        <img
                            src={placeholder}
                            style={{
                                width: '40%',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1',
                                gap: '5px',
                            }}
                        >
                            <RowDetails
                                title="Product name"
                                value={product.title}
                            />

                            <RowDetails
                                title="Description"
                                value={product.description}
                            />

                            <RowDetails
                                title="Rate"
                                value={`₱ ${product.rate} / night`}
                            />

                            <RowDetails
                                title="Created at"
                                value={new Date(
                                    product.createdAt,
                                ).toDateString()}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
