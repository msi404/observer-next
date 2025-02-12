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
			query: ( params ) => `voters?${ params }`,
			transformResponse: ( response: any ) =>
			{
				const items = response.data.items.map( ( item: Voter ) =>
				{
					return {
						id: item.id,
						name: item.name,
						address: item.address,
						birth: item.dateOfBirth,
						province: item.pollingCenter.govCenter,
						pollingCenter: item.pollingCenter,
						gender: item.gender,
						candidate: item.candidate,
						serial: item.serial,
						card: item.img,
						state: item.state
					}
				} )
				return {
					items,
					pageNumber: response.data.pageNumber,
					pageSize: response.data.pageSize,
					totalCount: response.data.totalCount,
					totalPages: response.data.totalPages
				}
			}
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
