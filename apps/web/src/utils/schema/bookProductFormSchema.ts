import z from 'zod';

export const bookProductFormSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    additionalNote: z.string().optional(),
});
