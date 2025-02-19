'use client';
import { z } from 'zod';

export const addStationSchema = z.object( {
	pollingCenterId: z.string(),
  serial: z.string().min(3)
} );
