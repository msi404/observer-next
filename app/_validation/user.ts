'use client';
import { z } from 'zod';

export const addUserSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().default( new Date() ),
  govId: z.string().min(3),
  pollingCenterId: z.string().min(3),
  electoralEntityId: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string(),
  email: z.string().email(),
  candidateSerial: z.number().optional(),
  candidateListSerial: z.number().optional()
} );

export const addCandidateSchema = z.object({
  name: z.string().min(3),
  dateOfBirth: z.date().default( new Date() ),
  govId:z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }).optional(),
  pollingCenterId: z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }).optional(),
  electoralEntityId: z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }).optional(),
  username: z.string().min(3),
  password: z.string().min(6).optional(),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(5),
  email: z.string().email(),
  candidateSerial: z.number().min(1),
  candidateListSerial: z.number().min(1)
} );

export const addDataEntrySchema = z.object({
  name: z.string().min(3),
  birth: z.date().default( new Date() ),
  govId:z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }),
  pollingCenterId: z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }),
  electoralEntityId: z.string().transform( ( value ) =>
    {
      if ( value === '' )
      {
        return null
      } else
      {
        return value
      }
    }),
  username: z.string().min(3),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(5),
  email: z.string().email(),
});
