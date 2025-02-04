'use client';
import { z } from 'zod';

export const addUserSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().default( new Date() ),
  govId: z.string().min(3),
  pollingCenterId: z.string().min(3),
  electoralEntityId: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string(),
  email: z.string().email(),
  candidateSerial: z.number().optional(),
  candidateListSerial: z.number().optional()
});
