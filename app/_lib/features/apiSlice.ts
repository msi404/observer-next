import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {type RootState} from '@/app/_lib/store'

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const baseApi = baseURL + '/api/'

export const tatweerApi = createApi( {
	reducerPath: 'tatweerApi',
	baseQuery: fetchBaseQuery( {
		baseUrl: baseApi,
		prepareHeaders: ( headers, { getState } ) =>
		{
			const token = ( getState() as RootState ).auth.token
			if ( token )
			{
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	} ),
	endpoints: () => ({})
	})