import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tatweerApi = createApi( {
	reducerPath: 'tatweerApi',
	baseQuery: fetchBaseQuery( { baseUrl: 'https://observer-api.tatweer-dev.com/api/' } ),
	endpoints: () => ({})
	})