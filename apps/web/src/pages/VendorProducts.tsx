import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import placeholder from '../assets/product-placeholder.jpg';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { ListContainer } from '../components/container/ListContainer';
import { RowDetails } from '../components/Text/RowDetails';

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
        <ListContainer>
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
                        src={product.productImage[0]?.url || placeholder}
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
                            value={new Date(product.createdAt).toDateString()}
                        />
                    </div>
                </div>
            ))}
        </ListContainer>
    );
};
