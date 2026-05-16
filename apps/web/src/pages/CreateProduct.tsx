import { useForm, Controller } from 'react-hook-form';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import type { CreateProductInput } from '../utils/types';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductFormSchema } from '../utils/schema/createProductFormSchema';
import { useToast } from '../components/Toast/toastHook';
import { BaseContainer } from '../components/container/BaseContainer';
import { useMemo, useRef, useState } from 'react';
import { COLORS } from '../styles/colors';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export const CreateProduct = () => {
    const { addToast } = useToast();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const [expandedImg, setExpandedImg] = useState<number | null>(null);

    const expandedImgUrl = useMemo(() => {
        if (expandedImg !== null) {
            return URL.createObjectURL(uploadedFiles[expandedImg]);
        }
    }, [expandedImg]);

    const { control, handleSubmit, reset } = useForm<CreateProductInput>({
        resolver: zodResolver(createProductFormSchema),
        criteriaMode: 'all',
        defaultValues: {
            title: '',
            rate: '',
            units: '',
            description: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createProduct,
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
        onSuccess: () => {
            addToast(
                'Successfully created product! Add another product or view created product in Products tab.',
                'success',
            );
            reset();
        },
    });

    const handleCreateProductBtn = (createProductInput: CreateProductInput) => {
        mutate(createProductInput);
    };

    const handleAttachFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        setUploadedFiles((prev) => [prev, files].flat());
    };

    const handleCloseExpandedPreview = () => {
        setExpandedImg(null);
    };

    const handleRemoveFile = (fileIndex: number) => {
        setUploadedFiles((prev) =>
            prev.filter((_, index) => fileIndex !== index),
        );
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
            <AnimatePresence>
                {expandedImg !== null && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={handleCloseExpandedPreview}
                        style={{
                            position: 'fixed',
                            top: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: `${COLORS.greyOverlay}`,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '50px',
                            zIndex: 2,
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'black',
                                maxWidth: '800px',
                                maxHeight: '600px',
                                width: '100%',
                                height: '100%',
                                padding: '15px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <div
                                style={{
                                    height: '80%',
                                    position: 'relative',
                                }}
                            >
                                <FaTimes
                                    color="white"
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: 'black',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleCloseExpandedPreview}
                                />
                                <img
                                    src={expandedImgUrl}
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    height: '20%',
                                    display: 'flex',
                                    gap: '8px',
                                    flexDirection: 'row',
                                }}
                            >
                                {uploadedFiles.map((file, index) => {
                                    const previewUrl =
                                        URL.createObjectURL(file);

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                height: '100%',
                                                width: '70px',
                                                cursor: 'pointer',
                                                position: 'relative',
                                            }}
                                            onClick={() => {
                                                setExpandedImg(index);
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor:
                                                        index !== expandedImg
                                                            ? `${COLORS.greyOverlay}`
                                                            : undefined,
                                                }}
                                            />
                                            <img
                                                src={previewUrl}
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BaseContainer
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    height: 'fit-content',
                }}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormInput
                            label="Title"
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

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}
                >
                    <Controller
                        name="rate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Rate (php)"
                                value={field.value}
                                type={'number'}
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
                        name={'units'}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <FormInput
                                label="Number of units"
                                type={'number'}
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
                </div>

                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormInput
                            label="Description"
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

                <PrimaryButton
                    onClick={() => {
                        fileInputRef.current?.click();
                    }}
                >
                    Select photos
                </PrimaryButton>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        height: '50px',
                        marginTop: '5px',
                    }}
                >
                    {uploadedFiles.map((file, index) => {
                        const previewUrl = URL.createObjectURL(file);

                        return (
                            <div
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <FaTimes
                                    onClick={() => handleRemoveFile(index)}
                                    size={15}
                                    style={{
                                        color: 'white',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        zIndex: 1,
                                        backgroundColor: 'black',
                                        borderRadius: '100%',
                                        padding: '3px',
                                        cursor: 'pointer',
                                    }}
                                />
                                <div
                                    onClick={() => {
                                        setExpandedImg(index);
                                    }}
                                    key={index}
                                    style={{
                                        width: '50px',
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: '100%',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                        src={previewUrl}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleAttachFiles}
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
                </div>
            </BaseContainer>
        </div>
    );
};
