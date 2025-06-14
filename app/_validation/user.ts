'use client';
import { z } from 'zod';
import { calcAge } from '@/app/_utils/calc-age'

export const addUserSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر المسخدم لا يقل عن 18 عام'}),
  govId: z.string().min(3),
  pollingCenterId: z.string().min(3),
  electoralEntityId: z.string().min(3),
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
  candidateSerial: z.number().optional(),
  candidateListSerial: z.number().optional()
} );

export const addCandidateSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر المرشح لا يقل عن 18 عام'}),
  govCenterId: z.string().min( 3 ),
  ethnicity: z.enum(['0', '2', '6']).transform((val) => Number(val)).default('0').optional(),
  religion: z.enum(['0', '2', '4', '6']).transform((val) => Number(val)).default('0').optional(),
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
  username: z.string().min(3).max(16),
  password: z.string().min(6).optional(),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
  candidateSerial: z.string().min( 1 ).transform( ( value ) =>
  {
    return Number(value)
  }),
  candidateListSerial: z.string().min(1).transform( ( value ) =>
    {
      return Number(value)
    }),
} );
export const editCandidateSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر المرشح لا يقل عن 18 عام'}),
  govCenterId: z.string().min(3),
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
  } ).optional(),
  ethnicity: z.enum(['0', '2', '6']).transform((val) => Number(val)).default('0').optional(),
  religion: z.enum(['0', '2', '4', '6']).transform((val) => Number(val)).default('0').optional(),
  username: z.string().min(3).max(16),
  password: z.string().min(6).optional(),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
  candidateSerial: z.number().min( 1 ).transform( ( value ) =>
  {
    return Number(value)
  }),
  candidateListSerial: z.number().min(1).transform( ( value ) =>
    {
      return Number(value)
    }),
} );

export const addDataEntrySchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر مدخل البيانات لا يقل عن 18 عام'}),
  govCenterId:z.string().min(3),
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
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
} );

export const addObserverSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر المراقب لا يقل عن 18 عام'}),
  govCenterId:z.string().min(3),
  pollingCenterId: z.string().min( 3 ),
  stationId: z.string().min(3),
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
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
} );

export const addElectralAdminSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر ممثل الكيان لا يقل عن 18 عام'}),
  electoralEntityId: z.string().min(3),
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
} );

export const addProvinceAdminSchema = z.object({
  name: z.string().min( 3 ),
  gender: z.enum(['0', '1']).transform((val) => Number(val)),
  dateOfBirth: z.date().refine((d) => Number(calcAge(String(d))) >= 18, {message:'يجب ان يكون عمر مدير المحافظة لا يقل عن 18 عام'}),
  govCenterId :z.string().min(3),
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
  username: z.string().min(3).max(16),
  password: z.string().min(6),
  profileImg: z.string().optional(),
  coverImg: z.string().optional(),
  role: z.number(),
  phone: z.string().min(11).max(16),
  email: z.string().email(),
});

export const changePasswordSchema = z.object( {
  newPassword: z.string().min( 6 ).max( 16 ),
  notify: z.boolean().default(false)
})