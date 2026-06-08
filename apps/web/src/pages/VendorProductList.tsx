import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { bookProduct, getProductsByVendor } from '../api/products';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';
import { type BookProductForm, type ProductData } from '../utils/types';
import { COLORS } from '../styles/colors';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { useEffect, useState } from 'react';
import { DateInput } from '../components/input/DateInput';
import { FormInput } from '../components/input/FormInput';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookProductFormSchema } from '../utils/schema/bookProductFormSchema';
import { useToast } from '../components/Toast/toastHook';
import { ListContainer } from '../components/container/ListContainer';
import { RowDetails } from '../components/Text/RowDetails';
import { ProductImageTile } from '../components/container/ProductImageTile';
import { PageList } from '../components/pagination/PageList';

export const VendorProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);

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
            setProductId(undefined);
            addToast('Successfully booked!', 'success');
        },
    });

    const { isLoading, data } = useQuery({
        queryKey: ['vendor', 'product', 'list', vendorId, currentPage],
        queryFn: () => getProductsByVendor(vendorId!, currentPage),
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
                        backgroundColor: COLORS.greyOverlay,
                        position: 'fixed',
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        top: '0',
                        zIndex: 1,
                    }}
                    onClick={() => {
                        reset();
                        setProductId(undefined);
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'black',
                            padding: '20px',
                            maxWidth: '400px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -70%)',
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
                {data?.data.products.map((product: ProductData) => (
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
                        <ProductImageTile
                            images={product.productImage}
                            style={{ width: '40%' }}
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
                <PageList
                    currentPage={currentPage}
                    onChange={(page) => {
                        setCurrentPage(page);
                    }}
                    totalPages={data?.data.totalPages}
                />
            </ListContainer>
        </>
    );
};
