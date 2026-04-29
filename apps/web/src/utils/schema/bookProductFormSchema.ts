import z from 'zod';

export const bookProductFormSchema = z.object({
    startDate: z.date({
        error: (issue) => {
            if (!issue.input) {
                return 'Start date is required';
            }
            return 'Invalid type';
        },
    }),
    endDate: z.date({
        error: (issue) => {
            if (!issue.input) {
                return 'End date is required';
            }
            return 'Invalid type';
        },
    }),
    additionalNote: z.string().optional(),
});
