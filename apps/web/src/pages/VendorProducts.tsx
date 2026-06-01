import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { ListContainer } from '../components/container/ListContainer';
import { ProductListTile } from '../components/container/ProductListTile';

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
                <ProductListTile product={product} key={product.id} />
            ))}
        </ListContainer>
    );
};
