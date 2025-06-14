'use client';
import { z } from 'zod';

export const addPollingCenterSchema = z.object( {
	govCenterId: z.string(),
	name: z.string().min( 3 ),
	serial: z.string().min( 3 ),
	address: z.string().min( 3 ),
	region: z.string().min( 3 ),
	judiciary: z.string().min(3)
} );
