import z from 'zod';

export const bookProductFormSchema = z.object({
    startDate: z.string().nonempty(),
    endDate: z.string().nonempty(),
    additionalNote: z.string().optional(),
});
