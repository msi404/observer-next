/* eslint-disable @typescript-eslint/no-explicit-any */
import { tatweerApi } from '@/app/_lib/features/apiSlice';

const fetchDataApi = tatweerApi.injectEndpoints({
  endpoints: ( builder ) => ( {
    electoralEntities: builder.query( {
      query: ( query ) => `electoralentities?${ query }`,
      transformResponse: ( response: any ) =>
        {
          const items = response.data.items;
          return {
            items,
            pageNumber: response.data.pageNumber,
            pageSize: response.data.pageSize,
            totalCount: response.data.totalCount,
            totalPages: response.data.totalPages
          };        
        }
    }),
    post: builder.query( {
      query: (params) => `posts/${params}`,
      transformResponse: ( response: any ) =>
        {
          return response.data          
        }
    }),
    posts: builder.query( {
      query: (query) => `posts?${query}`,
      transformResponse: ( response: any ) =>
        {
          const items = response.data.items;
          return {
            items,
            pageNumber: response.data.pageNumber,
            pageSize: response.data.pageSize,
            totalCount: response.data.totalCount,
            totalPages: response.data.totalPages
          };
        }
    } ),
    unseenNotification: builder.query( {
      query: () => 'notifications/count-unseen',
      
    }),
    myNotification: builder.query( {
      query: (query) => `notifications/mine?${query}`,
      transformResponse: ( response: any ) =>
      {
        const items = response.data.items;
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    votersAgeStatistics: builder.query({
      query: (query) => `statistics/voters/ages?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.chart.map((item: any) => ({
          age: item.age,
          confirmedVoters: item.countStateConfirmed,
          possibleVoters: item.countStatePending
        }));
        return items;
      }
    }),
    candidatesActivitiesStatistics: builder.query({
      query: (query) => `statistics/candidates/posts?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.graph.map((item: any) => ({
          month: item.date,
          candidatesActivities: item.y
        }));
        return items;
      }
    }),
    complaints: builder.query({
      query: (query) => `complaints?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.items;
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    votersStatistics: builder.query({
      query: (query) => `statistics/voters/regions?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.chart.map((item: any) => {
          return {
            confirmedVoters: item.countStateConfirmed,
            possibleVoters: item.countStatePending,
            governorate: item.govName
          };
        });
        return items;
      }
    }),
    genderStatistics: builder.query({
      query: (query) => `statistics/voters/gender?${query}`,
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
          }
        ];
      }
    }),
    complaintsStatistics: builder.query({
      query: (query) => `statistics/complaints?${query}`,
      transformResponse: (response: any) => {
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
          }
        ];
      }
    }),
    provinces: builder.query({
      query: () => 'govs'
    }),
    pollingCenters: builder.query({
      query: (query) => `pollingcenters?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.items;
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    stations: builder.query({
      query: (query) => `stations?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.items;
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    govCenters: builder.query({
      query: (query) => `govcenters?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.items;
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    govCenter: builder.query({
      query: (id) => `govcenters/${id}`,
    }),
    users: builder.query({
      query: (query) => `users?${query}`
    } ),
    user: builder.query( {
      query: ({params, query}) => `users/${params}?${query}`
    }),
    currentUser: builder.query({
      query: () => 'users/current'
    }),
    voters: builder.query({
      query: (query) => `voters?${query}`,
      transformResponse: (response: any) => {
        const items = response.data.items.map((item: Voter) => {
          return {
            id: item.id,
            name: item.name,
            address: item.address,
            birth: item.dateOfBirth,
            province: item.pollingCenter?.govCenter,
            pollingCenter: item.pollingCenter,
            gender: item.gender,
            candidate: item.candidate,
            serial: item.serial,
            card: item.img,
            state: item.state
          };
        });
        return {
          items,
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        };
      }
    }),
    statistics: builder.query({
      query: (query) => `statistics?${query}`,
      transformResponse: (response: any) => {
        return {
          totalCandidates: response.data.totalCandidates,
          totalObservers: response.data.totalObservers,
          totalComplaints: response.data.totalComplaints,
          totalConfirmedVoters: response.data.totalConfirmedVoters,
          totalPendingVoters: response.data.totalPendingVoters
        };
      }
    } ),
    isUsernameTaken: builder.query( {
      query: (username) => `global/is-username-taken/${username}`
    }),
  }),
  overrideExisting: false
});

export const {
  useProvincesQuery,
  useUsersQuery,
  useLazyUsersQuery,
  useVotersQuery,
  useCurrentUserQuery,
  useStatisticsQuery,
  usePollingCentersQuery,
  useLazyPollingCentersQuery,
  useElectoralEntitiesQuery,
  useLazyElectoralEntitiesQuery,
  useGovCentersQuery,
  useLazyGovCentersQuery,
  useComplaintsStatisticsQuery,
  useGenderStatisticsQuery,
  useStationsQuery,
  useLazyStationsQuery,
  useVotersStatisticsQuery,
  useComplaintsQuery,
  useCandidatesActivitiesStatisticsQuery,
  useVotersAgeStatisticsQuery,
  useMyNotificationQuery,
  useUnseenNotificationQuery,
  useUserQuery,
  usePostsQuery,
  usePostQuery,
  useIsUsernameTakenQuery,
  useGovCenterQuery,
  useLazyGovCenterQuery
} = fetchDataApi;
