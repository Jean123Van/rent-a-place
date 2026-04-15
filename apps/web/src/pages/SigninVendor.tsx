import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { SigninVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signinVendor } from '../api/authentication';

export const SigninVendor = () => {
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm<SigninVendorInput>();

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
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
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
                                isPassword
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
                <SmallNote>
                    Don't have an account yet? Signup{' '}
                    <Link to="/signup/vendor">here</Link>.
                </SmallNote>
            </ShadowedContainer>
        </div>
    );
};
