import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { Controller, useForm } from 'react-hook-form';
import type { SignupVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/authentication';
import { BaseContainer } from '../components/container/BaseContainer';

export const Signup = () => {
    const { control, handleSubmit } = useForm<SignupVendorInput>();

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: signup,
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
            <BaseContainer
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
                            color: 'white',
                        }}
                    >
                        <h3>Account created successfully!</h3>

                        <h3>
                            <Link to="/signin/">Login here</Link>
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
                                        type={'password'}
                                        value={field.value}
                                        onChange={field.onChange}
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
                        <SmallNote style={{ color: 'white' }}>
                            Already have an account?
                            <Link to="/signin"> Login</Link> instead.
                        </SmallNote>
                    </div>
                )}
            </BaseContainer>
        </div>
    );
};
