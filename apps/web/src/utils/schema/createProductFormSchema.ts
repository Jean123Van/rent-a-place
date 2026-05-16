import z from 'zod';

export const createProductFormSchema = z.object({
    title: z.string().trim().nonempty('Title is required.'),
    rate: z
        .string()
        .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, 'Provide a valid rate.'),
    units: z
        .string()
        .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, 'Provide valid number of units.'),
    description: z.string().trim().nonempty('Description is required.'),
    files: z
        .array(z.instanceof(File))
        .min(1, { error: '* Provide at least one image.' }),
});
