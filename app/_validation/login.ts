'use client';
import { z } from 'zod';

export const loginSchema = z.object( {
	usernameOrPhone: z.string().min(3, {message: 'يجب ادخال اسم المستخدم او رقم الهاتف'}),
	password: z.string().min(3, {message: 'يجب ادخال كلمة المرور'})
})