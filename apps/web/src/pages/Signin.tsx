import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { SigninVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signin } from '../api/authentication';
import { useEffect } from 'react';
import { BaseContainer } from '../components/container/BaseContainer';

export const Signin = () => {
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<SigninVendorInput>();

    useEffect(() => {
        const token = localStorage.getItem('customer-token');

        if (token) {
            navigate('/customer/vendor-list');
        }
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: signin,
        onSuccess: (data) => {
            localStorage.setItem('customer-token', data?.data.access_token);
            navigate('/customer/vendor-list');
        },
    });

    const handleSigninClick = (signinVendorInputData: SigninVendorInput) => {
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
                        render={({ field }) => (
                            <FormInput
                                label="Email"
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormInput
                                label="Password"
                                onChange={field.onChange}
                                value={field.value}
                                type={'password'}
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
                    <Link to="/signup">here</Link>.
                </SmallNote>
            </BaseContainer>
        </div>
    );
};
