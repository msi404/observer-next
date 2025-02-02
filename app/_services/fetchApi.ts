import { tatweerApi } from "@/app/_services/api";

const fetchDataApi = tatweerApi.injectEndpoints( {
	endpoints: builder => ( {
		provinces: builder.query( {
			query: () => 'govs'
		}),
		pollingCenters: builder.query( {
			query: () => 'pollingcenters'
		} ),
		users: builder.query( {
			query: (filter) => `users?${filter}`
		} ),
		currentUser: builder.query( {
			query: () => 'users/current'
		} ),
		voters: builder.query( {
			query: (param) => `voters?${param}`
		} ),
		electoralEntities: builder.query( {
			query: () => 'electoralentities'
		}),
		statistics: builder.query( {
			query: () => "statistics",
		} ),
	} ),
	overrideExisting: false,
});

export const {
	useProvincesQuery,
	useUsersQuery,
	useCurrentUserQuery,
	useElectoralEntitiesQuery,
	useStatisticsQuery,
	useVotersQuery,
	usePollingCentersQuery
} = fetchDataApi;
