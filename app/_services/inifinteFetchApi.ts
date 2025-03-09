/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { tatweerApi } from '@/app/_lib/features/apiSlice';

const inifinteFetchApi = tatweerApi.injectEndpoints( {
	endpoints: ( builder ) => ( {
		electoralEntities: builder.infiniteQuery<ElectoralEntity[], string, number>( {
			infiniteQueryOptions: {
				initialPageParam: 1,
				maxPages: 3,
				getNextPageParam: ( lastPage, allPages, lastPageParam, allPageParams ) =>
				{
					return lastPageParam + 1;
				},
				getPreviousPageParam: ( firstPage, allPages, firstPageParam, allPageParams ) =>
				{
					return firstPageParam > 0 ? firstPageParam - 1 : undefined;
				}
			},
			query ( { pageParam } )
			{
				return `electoralentities?PageNumber=${pageParam}&PageSize=10`
			}
		})
	} ),
	overrideExisting: true
})

export const {useElectoralEntitiesInfiniteQuery} = inifinteFetchApi;