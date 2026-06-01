import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { SigninVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signinVendor } from '../api/authentication';
import { useEffect } from 'react';
import { BaseContainer } from '../components/container/BaseContainer';

export const SigninVendor = () => {
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<SigninVendorInput>();

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
                    <Link to="/signup/vendor">here</Link>.
                </SmallNote>
            </BaseContainer>
        </div>
    );
};
