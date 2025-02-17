'use client';
import { z } from 'zod';

export const addEventSchema = z.object( {
	title: z.string().min( 3 ),
	coverImage: z.string()
})