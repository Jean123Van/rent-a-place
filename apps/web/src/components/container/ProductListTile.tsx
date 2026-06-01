import type { ProductData } from '../../utils/types';
import { RowDetails } from '../Text/RowDetails';
import './productListTile.css';
import { ProductImageTile } from './ProductImageTile';

interface ProductLisTileProps {
    product: ProductData;
}

export const ProductListTile = ({ product }: ProductLisTileProps) => {
    return (
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
            <ProductImageTile
                style={{ width: '40%' }}
                images={product.productImage}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    gap: '5px',
                }}
            >
                <RowDetails title="Product name" value={product.title} />

                <RowDetails title="Description" value={product.description} />

                <RowDetails title="Rate" value={`₱ ${product.rate} / night`} />

                <RowDetails
                    title="Created at"
                    value={new Date(product.createdAt).toDateString()}
                />
            </div>
        </div>
    );
};
