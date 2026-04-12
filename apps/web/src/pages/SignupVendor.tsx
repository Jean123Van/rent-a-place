import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { SmallNote } from '../components/Text/SmallNote';
import { Controller, useForm } from 'react-hook-form';
import type { SignupVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signupVendor } from '../api/authentication';
import { LoadingSpinner } from '../components/Animation/LoadingSpinner/LoadingSpinner';

export const SignupVendor = () => {
    const { control, handleSubmit } = useForm<SignupVendorInput>();

    const { mutate, isPending } = useMutation({ mutationFn: signupVendor });

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
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                label="Username"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                label="Email"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <FormInput
                                label="Password"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {isPending ? (
                        <LoadingSpinner />
                    ) : (
                        <PrimaryButton
                            onClick={handleSubmit(handleSignupClick)}
                        >
                            Sign up
                        </PrimaryButton>
                    )}
                </form>
                <SmallNote>
                    Already have an account?{' '}
                    <Link to="/signin/vendor">Login</Link> instead.
                </SmallNote>
            </ShadowedContainer>
        </div>
    );
};
