'use client';
import { z } from 'zod';

export const addPostSchema = z.object( {
	title: z.string().min( 3 ),
	content: z.string().min( 3 ),
	img: z.string()
})