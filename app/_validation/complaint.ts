'use client';
import { z } from 'zod';

export const editComplaintSchema = z.object({
  replierId: z.string().min(3),
  title: z.string().min(3),
  content: z.string().min(3),
  img: z.string().min(3),
  reply: z.string().min(3)
});
