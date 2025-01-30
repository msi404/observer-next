'use client';
import { z } from 'zod';

export const loginSchema = z.object( {
	usernameOrPhone: z.string().min(3),
	password: z.string().min(3)
})