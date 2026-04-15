import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { DateInput } from '../components/input/DateInput';
import { FormInput } from '../components/input/FormInput';
import type { CreateProductInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/ products';

export const CreateProduct = () => {
    const { control, handleSubmit, setValue } = useForm<CreateProductInput>();

    const { mutate, isPending } = useMutation({ mutationFn: createProduct });

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

                <DateInput
                    onChangeStartDate={(e) => {
                        setValue('startDate', e.target.value);
                    }}
                    onChangeEndDate={(e) => {
                        setValue('endDate', e.target.value);
                    }}
                />

                <div
                    style={{
                        justifyContent: 'center',
                        display: 'flex',
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
