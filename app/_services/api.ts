import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {type RootState} from '@/app/_lib/store'

export const tatweerApi = createApi( {
	reducerPath: 'tatweerApi',
	baseQuery: fetchBaseQuery( {
		baseUrl: process.env.NEXT_PUBLIC_TEST_API_URL,
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