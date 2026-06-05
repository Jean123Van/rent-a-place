import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../api/products';
import type { ProductData } from '../utils/types';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { ListContainer } from '../components/container/ListContainer';
import { ProductListTile } from '../components/container/ProductListTile';
import { useEffect, useState } from 'react';

export const VendorProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['vendor', 'products', currentPage],
        queryFn: () => getAllProducts(currentPage),
    });

    const [renderedPageNum, setRenderedPageNum] = useState<number | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!data || renderedPageNum) return;

        const totalPages = data?.data.totalPages;

        if (totalPages > 10) {
            setRenderedPageNum(10);
            return;
        }

        setRenderedPageNum(data?.data.totalPages);
    }, [data]);

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
            <div
                style={{
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '5px',
                }}
            >
                {renderedPageNum! > 10 && (
                    <span
                        style={{
                            fontSize: '12px',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setRenderedPageNum((prev) => {
                                if (!prev) return;

                                return prev % 10 > 0
                                    ? prev - (prev % 10)
                                    : prev - 10;
                            });
                        }}
                    >
                        prev...
                    </span>
                )}
                {Array.from(
                    { length: 10 },
                    (_, i) => i + (renderedPageNum! - 9),
                ).map((pageNum) => (
                    <span
                        style={{
                            fontSize: '12px',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: pageNum === currentPage ? 'grey' : 'white',
                        }}
                        onClick={() => {
                            setCurrentPage(pageNum);
                        }}
                    >
                        {pageNum}
                    </span>
                ))}
                {data?.data.totalPages > renderedPageNum! && (
                    <span
                        style={{
                            textDecoration: 'underline',
                            fontSize: '12px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setRenderedPageNum((prev) => {
                                if (!prev) return;

                                const totalPages = data?.data.totalPages;

                                const remainingPages = totalPages - prev;

                                return remainingPages > 10
                                    ? prev + 10
                                    : prev + remainingPages;
                            });
                        }}
                    >
                        next...
                    </span>
                )}
            </div>
        </ListContainer>
    );
};
