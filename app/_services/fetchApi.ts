import { tatweerApi } from "@/app/_services/api";

const fetchDataApi = tatweerApi.injectEndpoints( {
	endpoints: builder => ( {
		votersStatistics: builder.query( {
			query: () => 'statistics/voters/regions',
			transformResponse: ( response: any ) =>
			{
				const items = response.data.chart.map( ( item: any ) =>
				{
					return {
						confirmedVoters: item.countStateConfirmed,
						possibleVoters: item.countStatePending,
						governorate: item.govName
					}	
				} )
				return items;
			}
		}),
		genderStatistics: builder.query( {
			query: () => 'statistics/voters/gender',
			transformResponse: ( response: any ) =>
			{
				return [
					{
						type: 'male',
						total: response.data.countMale,
						fill: 'var(--color-male)'
					},
					{
						type: 'female',
						total: response.data.countFemale,
						fill: 'var(--color-female)'
					},
				]
			} 
		}),
		complaintsStatistics: builder.query( {
			query: () => 'statistics/complaints',
			transformResponse: ( response: any ) =>
			{
				return [
					{
						type: 'closed',
						total: response.data.countReplied,
						fill: 'var(--color-closed)'
					},
					{
						type: 'opened',
						total: response.data.countNotReplied,
						fill: 'var(--color-opened)'
					},
				]
			}
		}),
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
			transformResponse: ( response: any ) =>
			{
				return {
					totalCandidates: response.data.totalCandidates,
					totalObservers: response.data.totalObservers,
					totalComplaints: response.data.totalComplaints,
					totalConfirmedVoters: response.data.totalConfirmedVoters,
					totalPendingVoters: response.data.totalPendingVoters
				}
			}
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
	useGovCentersQuery,
	useComplaintsStatisticsQuery,
	useGenderStatisticsQuery,
	useVotersStatisticsQuery
} = fetchDataApi;
