'use client';
import { z } from 'zod';

export const addElectoralEntitySchema = z.object( {
	name: z.string().min( 3 ),
})