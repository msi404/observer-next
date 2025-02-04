import { tatweerApi } from "@/app/_services/api";

const fetchDataApi = tatweerApi.injectEndpoints( {
	endpoints: builder => ( {
		provinces: builder.query( {
			query: () => 'govs'
		}),
		pollingCenters: builder.query( {
			query: () => 'pollingcenters'
		} ),
		electoralEntities: builder.query( {
			query: () => 'electoralentities'
		} ),
		govCenters: builder.query( {
			query: () => 'govcenters'
		}),
		users: builder.query( {
			query: (params) => `users?${params}`
		} ),
		currentUser: builder.query( {
			query: () => 'users/current'
		} ),
		voters: builder.query( {
			query: (params) => `voters?${params}`
		} ),
		statistics: builder.query( {
			query: () => "statistics",
		} ),
	} ),
	overrideExisting: false,
});

export const {
	useProvincesQuery,
	useUsersQuery,
	useVotersQuery,
	useCurrentUserQuery,
	useStatisticsQuery,
	usePollingCentersQuery,
	useElectoralEntitiesQuery,
	useGovCentersQuery
} = fetchDataApi;
