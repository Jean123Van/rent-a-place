import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { Controller, useForm } from 'react-hook-form';
import type { SignupVendorInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { signupVendor } from '../api/authentication';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupVendorFormSchema } from '../utils/schema/signupVendorFormSchema';
import { useToast } from '../components/Toast/toastHook';
import { BaseContainer } from '../components/container/BaseContainer';
import { useRef } from 'react';

export const SignupVendor = () => {
    const { addToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignupVendorInput>({
        resolver: zodResolver(signupVendorFormSchema),
        criteriaMode: 'all',
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const profileImg = watch('file');

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
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('file', data.file);

        mutate(formData);
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

                            <div
                                style={{
                                    width: '100%',

                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <input
                                    type="file"
                                    multiple={false}
                                    accept="image/*"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        const file = Array.from(
                                            e.target.files || [],
                                        )[0];

                                        if (!file) {
                                            return;
                                        }

                                        setValue('file', file, {
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <div
                                        style={{
                                            border: '1px solid white',
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '100%',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {profileImg && (
                                            <img
                                                src={URL.createObjectURL(
                                                    profileImg,
                                                )}
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        flex: 1,
                                        gap: '5px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <PrimaryButton
                                        onClick={() => {
                                            fileInputRef.current?.click();
                                        }}
                                    >
                                        Upload photo
                                    </PrimaryButton>
                                    {errors.file && (
                                        <SmallNote style={{ color: 'red' }}>
                                            {errors.file.message as string}
                                        </SmallNote>
                                    )}
                                </div>
                            </div>

                            <PrimaryButton
                                onClick={handleSubmit(handleSignupClick)}
                                isLoading={isPending}
                                style={{ marginTop: '20px' }}
                            >
                                Sign up
                            </PrimaryButton>
                        </form>
                        <SmallNote style={{ color: 'white' }}>
                            Already have an account?{' '}
                            <Link to="/signin/vendor">Login</Link> instead.
                        </SmallNote>
                    </div>
                )}
            </BaseContainer>
        </div>
    );
};
