import { z } from 'zod';

export const addressSchema = z.object({
  address: z
    .string()
    .min(1, 'Address is required')
    .refine((val) => /^0x[a-fA-F0-9]{40}$/.test(val), {
      message: 'Invalid Ethereum address format',
    }),
});
