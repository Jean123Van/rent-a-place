import type { ProductData } from '../../utils/types';
import placeholder from '../../assets/product-placeholder.jpg';
import { RowDetails } from '../Text/RowDetails';
import './productListTile.css';
import { useState } from 'react';

interface ProductLisTileProps {
    product: ProductData;
}

export const ProductListTile = ({ product }: ProductLisTileProps) => {
    const [activeImage, setActiveImage] = useState(product.productImage[0]);

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
            <div
                style={{
                    width: '40%',
                    height: '200px',
                    position: 'relative',
                }}
            >
                {product.productImage.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'white',
                            padding: '3px',
                            borderRadius: '5px',
                            border: '1px solid black',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '2px',
                        }}
                    >
                        {product.productImage.map((image) => (
                            <div
                                key={image.id}
                                style={{
                                    height: '10px',
                                    width: '10px',
                                    borderRadius: '100%',
                                    border: '2px solid grey',
                                    cursor: 'pointer',
                                    backgroundColor:
                                        image.id === activeImage.id
                                            ? 'grey'
                                            : 'transparent',
                                }}
                                className="image-indicator"
                                onClick={() => {
                                    setActiveImage(image);
                                }}
                            />
                        ))}
                    </div>
                )}

                <img
                    src={activeImage?.url || placeholder}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
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
