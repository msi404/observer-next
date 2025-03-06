import { tatweerApi } from '@/app/_services/api';

const mutationApi = tatweerApi.injectEndpoints({
  endpoints: ( builder ) => ( {
    createElectoralEntity: builder.mutation({
      query: (item) => ({
        url: 'electoralentities',
        method: 'POST',
        body: item
      })
    }),
    deleteElectoralEntity: builder.mutation({
      query: (id) => ({
        url: `electoralentities/${id}`,
        method: 'DELETE'
      })
    }),
    updateElectoralEntity: builder.mutation({
      query: ({ id, electoralEntity }) => ({
        url: `electoralentities/${id}`,
        method: 'PUT',
        body: electoralEntity
      })
    }),
    createPost: builder.mutation({
      query: (item) => ({
        url: 'posts',
        method: 'POST',
        body: item
      })
    }),
    updatePost: builder.mutation({
      query: ({ id, post }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: post
      })
    }),
    deletePost: builder.mutation({
      query: (params) => ({
        url: `posts/${params}`,
        method: 'DELETE'
      })
    }),
    updateComplaint: builder.mutation({
      query: ({ complaint, id }) => ({
        url: `complaints/${id}`,
        method: 'PUT',
        body: complaint
      })
    }),
    createNotification: builder.mutation({
      query: (item) => ({
        url: 'notifications',
        method: 'POST',
        body: item
      })
    }),
    switchSeenNotification: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}/switch-seen`,
        method: 'PUT'
      })
    }),
    createGovCenter: builder.mutation({
      query: (item) => ({
        url: 'govcenters',
        method: 'POST',
        body: item
      })
    }),
    deleteGovCenter: builder.mutation({
      query: (id) => ({
        url: `govcenters/${id}`,
        method: 'DELETE'
      })
    }),
    updateGovCenter: builder.mutation({
      query: ({ govCenter, id }) => ({
        url: `govcenters/${id}`,
        method: 'PUT',
        body: govCenter
      })
    }),
    createPollingCenter: builder.mutation({
      query: (item) => ({
        url: 'pollingcenters',
        method: 'POST',
        body: item
      })
    }),
    updatePollingCenter: builder.mutation({
      query: ({ id, pollingCenter }) => ({
        url: `pollingcenters/${id}`,
        method: 'PUT',
        body: pollingCenter
      })
    }),
    deletePollingCenter: builder.mutation({
      query: (id) => ({
        url: `pollingcenters/${id}`,
        method: 'DELETE'
      })
    }),
    createStation: builder.mutation({
      query: (item) => ({
        url: 'stations',
        method: 'POST',
        body: item
      })
    }),
    updateStation: builder.mutation({
      query: ({ id, station }) => ({
        url: `stations/${id}`,
        method: 'PUT',
        body: station
      })
    }),
    deleteStation: builder.mutation({
      query: (id) => ({
        url: `stations/${id}`,
        method: 'DELETE'
      })
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: 'attachments',
        method: 'POST',
        body: file
      })
    }),
    createVoter: builder.mutation({
      query: (voter) => ({
        url: 'voters',
        method: 'POST',
        body: voter
      })
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user
      })
    }),
    updateUser: builder.mutation({
      query: ({ user, id }: { user: any; id: string }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user
      })
    } ),
    changeUserPassword: builder.mutation({
      query: ({ body, id}: { body: any, id: string}) => ({
        url: `users/${id}/change-password`,
        method: 'PUT',
        body
      })
    }),
    updateCurrentUser: builder.mutation({
      query: ({ user}: { user: any}) => ({
        url: 'users/current',
        method: 'PUT',
        body: user
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    }),
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `voters/${id}`,
        method: 'DELETE'
      })
    }),
    updateVoter: builder.mutation({
      query: ({ voter, id }: { voter: any; id: string }) => ({
        url: `voters/${id}`,
        method: 'PUT',
        body: voter
      })
    })
  }),
  overrideExisting: false
});

export const {
  useUploadFileMutation,
  useCreateVoterMutation,
  useDeleteVoterMutation,
  useUpdateVoterMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreatePollingCenterMutation,
  useCreateGovCenterMutation,
  useDeleteGovCenterMutation,
  useUpdateGovCenterMutation,
  useCreateNotificationMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateElectoralEntityMutation,
  useDeleteElectoralEntityMutation,
  useUpdateElectoralEntityMutation,
  useUpdatePollingCenterMutation,
  useDeletePollingCenterMutation,
  useCreateStationMutation,
  useUpdateStationMutation,
  useDeleteStationMutation,
  useSwitchSeenNotificationMutation,
  useUpdateCurrentUserMutation,
  useUpdateComplaintMutation,
  useChangeUserPasswordMutation
} = mutationApi;
