import { tatweerApi } from '@/app/_services/api';

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