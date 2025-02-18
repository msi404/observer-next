'use client';
import { z } from 'zod';
import { calcAge } from '@/app/_utils/calc-age'


enum VoterState {
	Inactive = 0,
	Active = 2
 }
 
export const addConfirmedVoterSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر الناخب لا يقل عن 18 عام'}),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  img: z.string(),
  state: z.nativeEnum(VoterState),
  address: z.string().min(3),
  pollingCenterId: z.string().min(3),
  candidateId: z.string().transform( ( value ) =>
  {
    if ( value === '' )
    {
      return null
    } else
    {
      return value
    }
  }),
  serial: z.string().min(3)
} );

export const addPossibleVoterSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر الناخب لا يقل عن 18 عام'}),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  state: z.nativeEnum(VoterState),
  address: z.string().min(3),
  pollingCenterId: z.string().min(3),
  candidateId: z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }),  serial: z.string().min(3)
});
