import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { FormInput } from '../components/input/FormInput';
import type { CreateProductInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductFormSchema } from '../utils/schema/createProductFormSchema';
import { useToast } from '../components/Toast/toastHook';

export const CreateProduct = () => {
    const { addToast } = useToast();

    const { control, handleSubmit, reset } = useForm<CreateProductInput>({
        resolver: zodResolver(createProductFormSchema),
        criteriaMode: 'all',
        defaultValues: {
            title: '',
            rate: '',
            units: '',
            description: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createProduct,
        onError: () => {
            addToast(
                'Something went wrong. Please try again later or contact customer support.',
                'error',
            );
        },
        onSuccess: () => {
            addToast(
                'Successfully created product! Add another product or view created product in Products tab.',
                'success',
            );
            reset();
        },
    });

    const handleCreateProductBtn = (createProductInput: CreateProductInput) => {
        mutate(createProductInput);
    };

    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ShadowedContainer
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    height: 'fit-content',
                }}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormInput
                            label="Title"
                            value={field.value}
                            onChange={field.onChange}
                            error={
                                Object.values(
                                    error?.types || [],
                                ).flat() as string[]
                            }
                        />
                    )}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}
                >
                    <Controller
                        name="rate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Rate (php)"
                                value={field.value}
                                type={'number'}
                                onChange={field.onChange}
                                error={
                                    Object.values(
                                        error?.types || [],
                                    ).flat() as string[]
                                }
                            />
                        )}
                    />

                    <Controller
                        name={'units'}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Number of units"
                                type={'number'}
                                value={field.value}
                                onChange={field.onChange}
                                error={
                                    Object.values(
                                        error?.types || [],
                                    ).flat() as string[]
                                }
                            />
                        )}
                    />
                </div>

                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormInput
                            label="Description"
                            value={field.value}
                            onChange={field.onChange}
                            error={
                                Object.values(
                                    error?.types || [],
                                ).flat() as string[]
                            }
                        />
                    )}
                />

                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',

                        gap: '10px',
                    }}
                >
                    <PrimaryButton
                        onClick={handleSubmit(handleCreateProductBtn)}
                        isLoading={isPending}
                    >
                        Create
                    </PrimaryButton>
                </div>
            </ShadowedContainer>
        </div>
    );
};
