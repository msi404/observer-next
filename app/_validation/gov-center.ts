'use client';
import { z } from 'zod';

export const addGovCenterSchema = z.object( {
	govId: z.string().min(3),
} );
