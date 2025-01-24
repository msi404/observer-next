import { tatweerApi } from "@/app/_services/api";

const fetchDataApi = tatweerApi.injectEndpoints( {
	endpoints: builder => ( {
		currentUser: builder.query( {
			query: () => 'users/current'
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
	useCurrentUserQuery,
	useElectoralEntitiesQuery,
	useStatisticsQuery
} = fetchDataApi;
