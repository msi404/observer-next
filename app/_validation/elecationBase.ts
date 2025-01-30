'use client';
import { z } from 'zod';

export const addVoterSchema = z.object( {
	name: z.string().min( 3 ),
	birthDate: z.date().default(new Date),
	gender: z.string(),
	img: z.string(),
	address: z.string().min(5),
	pollingCenterId: z.string().min(3),
	candidateId: z.string().min(3),
	serial: z.string()
})