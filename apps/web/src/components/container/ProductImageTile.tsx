import { useState } from 'react';
import type { ProductImage } from '../../utils/types';
import placeholder from '../../assets/product-placeholder.jpg';

interface ProductImageTileProps {
    images?: ProductImage[];
    style?: React.CSSProperties;
}

export const ProductImageTile = ({ images, style }: ProductImageTileProps) => {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <div
            style={{
                height: '200px',
                position: 'relative',
                ...style,
            }}
        >
            {images && images.length > 0 && (
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
                    {images.map((image) => (
                        <div
                            key={image.id}
                            style={{
                                height: '10px',
                                width: '10px',
                                borderRadius: '100%',
                                border: '2px solid grey',
                                cursor: 'pointer',
                                backgroundColor:
                                    image.id === activeImage!.id
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
    );
};
