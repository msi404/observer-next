'use client';
import { z } from 'zod';

export const addGovCenterSchema = z.object( {
	name: z.string().min( 3 ),
	serial: z.string().min( 1 ),
	govId: z.string().min(3),
} );
