import { tatweerApi } from '@/app/_lib/features/apiSlice';

export const authApi = tatweerApi.injectEndpoints( {
	endpoints: ( builder ) => ( {
		login: builder.mutation( {
			query: ( credentials ) => ( {
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			})
		})
	} ),
	overrideExisting: false
} );

export const {useLoginMutation} = authApi;