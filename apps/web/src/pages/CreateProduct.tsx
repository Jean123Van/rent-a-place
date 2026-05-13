import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { FormInput } from '../components/input/FormInput';
import type { CreateProductInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/products';
import { SuccessModal } from '../components/Modal/SuccessModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductFormSchema } from '../utils/schema/createProductFormSchema';

export const CreateProduct = () => {
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

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
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
                    <SuccessModal isSuccess={isSuccess} />
                </div>
            </ShadowedContainer>
        </div>
    );
};
