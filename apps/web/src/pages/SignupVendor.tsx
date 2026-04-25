import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { SmallNote } from '../components/Text/SmallNote';
import { Controller, useForm } from 'react-hook-form';
import type { SignupVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signupVendor } from '../api/authentication';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupVendorFormSchema } from '../utils/schema/signupVendorFormSchema';
import { useToast } from '../components/Toast/toastHook';

export const SignupVendor = () => {
    const { addToast } = useToast();

    const { control, handleSubmit } = useForm<SignupVendorInput>({
        resolver: zodResolver(signupVendorFormSchema),
        criteriaMode: 'all',
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: signupVendor,
        onError: (error: any) => {
            if (error?.response?.data.statusCode === 409) {
                addToast(error?.response?.data.message, 'error');
                return;
            }

            addToast(
                'Something went wrong. Please try again later or contact customer support.',
                'error',
            );
        },
    });

    const handleSignupClick = (data: SignupVendorInput) => {
        mutate(data);
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
            <ShadowedContainer
                style={{
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                {isSuccess ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3>Account created successfully!</h3>

                        <h3>
                            <Link to="/signin/vendor">Login here</Link>
                        </h3>
                    </div>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: '10px',
                            }}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <Controller
                                name="username"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormInput
                                        disabled={isPending}
                                        label="Username"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={
                                            Object.values(
                                                error?.types || [],
                                            ).flat() as string[]
                                        }
                                        hint="Should be 6 to 20 characters long"
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormInput
                                        disabled={isPending}
                                        label="Email"
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
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormInput
                                        disabled={isPending}
                                        label="Password"
                                        type={'password'}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={
                                            Object.values(
                                                error?.types || [],
                                            ).flat() as string[]
                                        }
                                        hint="Should be 6 to 20 characters long, contain a capital letter, number, and symbol."
                                    />
                                )}
                            />
                            <PrimaryButton
                                onClick={handleSubmit(handleSignupClick)}
                                isLoading={isPending}
                            >
                                Sign up
                            </PrimaryButton>
                        </form>
                        <SmallNote>
                            Already have an account?{' '}
                            <Link to="/signin/vendor">Login</Link> instead.
                        </SmallNote>
                    </div>
                )}
            </ShadowedContainer>
        </div>
    );
};
