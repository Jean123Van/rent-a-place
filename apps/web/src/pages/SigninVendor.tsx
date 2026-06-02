import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { SignInVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signinVendor } from '../api/authentication';
import { useEffect } from 'react';
import { BaseContainer } from '../components/container/BaseContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInFormSchema } from '../utils/schema/signInFormSchema';
import { useToast } from '../components/Toast/toastHook';

export const SigninVendor = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<SignInVendorInput>({
        criteriaMode: 'all',
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(signInFormSchema),
    });

    useEffect(() => {
        const token = localStorage.getItem('vendor-token');

        if (token) {
            navigate('/create-product');
        }
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: signinVendor,
        onSuccess: (data) => {
            localStorage.setItem('vendor-token', data?.data.access_token);
            navigate('/create-product');
        },
        onError: (error: any) => {
            if (error?.response?.data.statusCode === 401) {
                addToast(error?.response?.data.message, 'error');
                return;
            }

            addToast(
                'Something went wrong. Please try again later or contact support.',
                'error',
            );
        },
    });

    const handleSigninClick = (signinVendorInputData: SignInVendorInput) => {
        mutate(signinVendorInputData);
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <BaseContainer
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: '10px',
                    }}
                >
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Email"
                                onChange={field.onChange}
                                value={field.value}
                                error={
                                    Object.values(
                                        error?.types || [],
                                    ).flat() as string[]
                                }
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Password"
                                onChange={field.onChange}
                                value={field.value}
                                type={'password'}
                                error={
                                    Object.values(
                                        error?.types || [],
                                    ).flat() as string[]
                                }
                            />
                        )}
                    />
                    <PrimaryButton
                        onClick={handleSubmit(handleSigninClick)}
                        isLoading={isPending}
                    >
                        Log in
                    </PrimaryButton>
                </form>
                <SmallNote style={{ color: 'white' }}>
                    Don't have an account yet? Signup{' '}
                    <Link to="/signup/vendor">here</Link>.
                </SmallNote>
            </BaseContainer>
        </div>
    );
};
