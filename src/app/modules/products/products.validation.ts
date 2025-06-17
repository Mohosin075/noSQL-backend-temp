import { Types } from 'mongoose';
import { z } from 'zod';

const objectId = () =>
  z
    .string()
    .refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    });

export const createProductZodSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().gt(0),
    category: objectId(),
    quantity: z.number().int().min(0),
    images: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});
