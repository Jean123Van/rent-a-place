import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { bookProduct, getProductsByVendor } from '../api/products';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { type BookProductForm, type ProductData } from '../utils/types';
import { COLORS } from '../styles/colors';
import placeholder from '../assets/product-placeholder.png';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useState } from 'react';
import { DateInput } from '../components/input/DateInput';
import { FormInput } from '../components/input/FormInput';
import { Controller, useForm } from 'react-hook-form';
import { SuccessModal } from '../components/Modal/SuccessModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookProductFormSchema } from '../utils/schema/bookProductFormSchema';

const Title = ({ value }: { value: string }) => {
    return (
        <span style={{ fontSize: '14px', fontWeight: 'bolder' }}>{value}</span>
    );
};

const Description = ({ value }: { value: string }) => {
    return <span style={{ fontSize: '14px' }}>{value}</span>;
};

export const VendorProductList = () => {
    const { vendorId } = useParams();

    const [productId, setProductId] = useState<string | undefined>(undefined);

    const { handleSubmit, control, setValue } = useForm<BookProductForm>({
        resolver: zodResolver(bookProductFormSchema),
    });

    const { isPending, mutate, isSuccess } = useMutation({
        mutationFn: bookProduct,
    });

    const { isLoading, data } = useQuery({
        queryKey: ['vendor', 'product', 'list'],
        queryFn: () => getProductsByVendor(vendorId!),
    });

    const handleBookBtn = (bookProductInput: BookProductForm) => {
        mutate({
            ...bookProductInput,
            productId: productId!,
            vendorId: vendorId!,
        });
    };

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
        <>
            {productId && (
                <div
                    style={{
                        backgroundColor: COLORS.skintoneOverlay,
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={() => {
                        setProductId(undefined);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            maxWidth: '400px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DateInput
                            onChangeStartDate={(e) => {
                                setValue('startDate', e.target.value);
                            }}
                            onChangeEndDate={(e) => {
                                setValue('endDate', e.target.value);
                            }}
                        />
                        <Controller
                            control={control}
                            name="additionalNote"
                            render={({ field }) => (
                                <FormInput
                                    label="Additional note"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <PrimaryButton
                            isLoading={isPending}
                            onClick={handleSubmit(handleBookBtn)}
                        >
                            Book
                        </PrimaryButton>
                        <SuccessModal isSuccess={isSuccess} />
                    </div>
                </div>
            )}

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
                        </div>
                        <PrimaryButton onClick={() => setProductId(product.id)}>
                            Book now
                        </PrimaryButton>
                    </div>
                ))}
            </div>
        </>
    );
};
