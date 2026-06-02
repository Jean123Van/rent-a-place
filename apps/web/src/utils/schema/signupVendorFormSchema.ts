import z from 'zod';

export const signupVendorFormSchema = z.object({
    username: z.string().superRefine((val, ctx) => {
        if (val.length < 6) {
            ctx.addIssue({
                code: 'custom',
                message: 'Username should be at least 6 characters.',
            });
        }

        if (val.length > 20) {
            ctx.addIssue({
                code: 'custom',
                message:
                    'Username too long. Should not be more than 20 characters.',
            });
        }
    }),
    email: z.email('Please provide a valid email.'),
    password: z.string().superRefine((val, ctx) => {
        if (val.length < 6) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password should be at least 6 characters.',
            });
        }

        if (val.length > 20) {
            ctx.addIssue({
                code: 'custom',
                message:
                    'Password too long. Should not be more than 20 characters.',
            });
        }

        if (!/[A-Z]/.test(val)) {
            ctx.addIssue({
                code: 'custom',
                message: 'Must have at least one capital letter.',
            });
        }

        if (!/[0-9]/.test(val)) {
            ctx.addIssue({
                code: 'custom',
                message: 'Must have at least one number.',
            });
        }

        if (!/[^A-Za-z0-9]/.test(val)) {
            ctx.addIssue({
                code: 'custom',
                message: 'Must have at least one symbol.',
            });
        }
    }),
    file: z.instanceof(File).nonoptional('Image is required.'),
});
