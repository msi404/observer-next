'use client';
import { z } from 'zod';

export const addNotificationSchema = z.object( {
	title: z.string().min(3),
	content: z.string().min( 3 ),
  role: z.number().min(1)
} );
