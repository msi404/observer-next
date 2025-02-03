'use client';
import { z } from 'zod';

export const addVoterSchema = z.object( {
	name: z.string().min( 3 ),
	dateOfBirth: z.date().default(new Date),
	gender: z.enum(['0', '1']).transform((val) => Number(val)),
	img: z.string(),
	address: z.string(),
	pollingCenterId: z.string().min(3),
	candidateId: z.string().min(3),
	serial: z.string().min(3)
})