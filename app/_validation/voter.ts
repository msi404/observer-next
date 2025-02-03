'use client';
import { z } from 'zod';


enum VoterState {
	Inactive = 0,
	Active = 2
 }
 
export const addConfirmedVoterSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().default(new Date()),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  img: z.string(),
  state: z.nativeEnum(VoterState),
  address: z.string(),
  pollingCenterId: z.string().min(3),
  candidateId: z.string(),
  serial: z.string().min(3)
});
