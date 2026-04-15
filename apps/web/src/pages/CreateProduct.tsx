import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { FormInput } from '../components/input/FormInput';
import type { CreateProductInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/ products';

export const CreateProduct = () => {
    const { control, handleSubmit, reset } = useForm<CreateProductInput>();

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
                    render={({ field }) => (
                        <FormInput
                            label="Title"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            label="Rate (php)"
                            value={field.value}
                            type={'number'}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            label="Description"
                            value={field.value}
                            onChange={field.onChange}
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
                    {isSuccess && (
                        <span
                            style={{
                                textAlign: 'center',
                                color: 'green',
                                fontSize: '15px',
                                border: '2px solid green',
                                padding: '5px',
                                borderRadius: '5px',
                            }}
                        >
                            Successfully created product! Add another product or
                            view created product in Products tab
                        </span>
                    )}
                </div>
            </ShadowedContainer>
        </div>
    );
};
