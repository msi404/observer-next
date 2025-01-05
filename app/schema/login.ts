'use client';
import { z } from 'zod';

export const loginSchema = z.object( {
	UserNameOrPhoneNumber: z.string().min(3),
	password: z.string().min(3)
})