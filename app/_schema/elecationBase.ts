'use client';
import { z } from 'zod';

export const addVoterSchema = z.object( {
	name: z.string().min( 3 ),
	birthDate: z.date().default(new Date),
	gender: z.string().min(2),
	iDimage: z.string(),
	address: z.string(),
	pollingCenterId: z.string(),
	candidateId: z.string(),
	voterType: z.string()
})