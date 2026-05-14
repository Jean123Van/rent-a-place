import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { bookProduct, getProductsByVendor } from '../api/products';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { type BookProductForm, type ProductData } from '../utils/types';
import { COLORS } from '../styles/colors';
import placeholder from '../assets/product-placeholder.jpg';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useState } from 'react';
import { DateInput } from '../components/input/DateInput';
import { FormInput } from '../components/input/FormInput';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookProductFormSchema } from '../utils/schema/bookProductFormSchema';
import { useToast } from '../components/Toast/toastHook';
import { ListContainer } from '../components/container/ListContainer';
import { RowDetails } from '../components/Text/RowDetails';

export const VendorProductList = () => {
    const { addToast } = useToast();

    const { vendorId } = useParams();

    const [productId, setProductId] = useState<string | undefined>(undefined);

    const {
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<BookProductForm>({
        resolver: zodResolver(bookProductFormSchema),
        criteriaMode: 'all',
    });

    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const { isPending, mutate } = useMutation({
        mutationFn: bookProduct,
        onError: () => {
            addToast(
                'Something went wrong. Please try again later or contact costumer support',
                'error',
            );
        },
        onSuccess: () => {
            reset();
            addToast(
                'Successfully created product! Add another product or view created product in Products tab',
                'success',
            );
        },
    });

    const { isLoading, data } = useQuery({
        queryKey: ['vendor', 'product', 'list'],
        queryFn: () => getProductsByVendor(vendorId!),
    });

    const handleBookBtn = (bookProductInput: BookProductForm) => {
        console.log({
            ...bookProductInput,
            productId: productId!,
            vendorId: vendorId!,
        });
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
                        reset();
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
                            disabled={isPending}
                            startDate={startDate}
                            onChangeStartDate={(date) => {
                                setValue('startDate', date, {
                                    shouldValidate: true,
                                });
                            }}
                            endDate={endDate}
                            onChangeEndDate={(date) => {
                                setValue('endDate', date, {
                                    shouldValidate: true,
                                });
                            }}
                            error={
                                [
                                    Object.values(
                                        errors.startDate?.types || [],
                                    ),
                                    Object.values(errors.endDate?.types || []),
                                ].flat() as string[]
                            }
                        />
                        <Controller
                            control={control}
                            name="additionalNote"
                            render={({ field }) => (
                                <FormInput
                                    disabled={isPending}
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
                    </div>
                </div>
            )}

            <ListContainer>
                {data?.data.map((product: ProductData) => (
                    <div
                        style={{
                            border: `1px solid white`,
                            borderRadius: '10px',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'row',

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
                        <div>
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
                            </div>
                            <PrimaryButton
                                onClick={() => setProductId(product.id)}
                            >
                                Book now
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </ListContainer>
        </>
    );
};
