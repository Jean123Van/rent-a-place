import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { ListContainer } from '../components/container/ListContainer';
import { ProductListTile } from '../components/container/ProductListTile';
import { useState } from 'react';
import { PageList } from '../components/pagination/PageList';

export const VendorProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['vendor', 'products', currentPage],
        queryFn: () => getAllProducts(currentPage),
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
            {data?.data.products.map((product: ProductData) => (
                <ProductListTile product={product} key={product.id} />
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
