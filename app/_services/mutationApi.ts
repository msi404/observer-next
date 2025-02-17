import { tatweerApi } from '@/app/_services/api';

const mutationApi = tatweerApi.injectEndpoints({
  endpoints: ( builder ) => ( {
    createElectoralEntity: builder.mutation( {
      query: ( item ) => ( {
        url: 'electoralentities',
        method: 'POST',
        body: item
      })
    } ),
    deleteElectoralEntity: builder.mutation( {
      query: ( id ) => ( {
        url: `electoralentities/${id}`,
        method: 'DELETE',
      })
    } ),
    updateElectoralEntity: builder.mutation( {
      query: ( {id, electoralEntity} ) => ( {
        url: `electoralentities/${id}`,
        method: 'PUT',
        body: electoralEntity
      })
    }),
    createPost: builder.mutation( {
      query: ( item ) => ( {
        url: 'posts',
        method: 'POST',
        body: item
      })
    }),
    updatePost: builder.mutation( {
      query: ( {id, post} ) => ( {
        url: `posts/${id}`,
        method: 'PUT',
        body: post
      })
    }),
    deletePost: builder.mutation( {
      query: ( params ) => ( {
        url: `posts/${params}`,
        method: 'DELETE',
      })
    }),
    createNotification: builder.mutation( {
      query: ( item ) => ( {
        url: 'notifications',
        method: 'POST',
        body: item
      })
    }),
    createGovCenter: builder.mutation( {
      query: ( item ) => ( {
        url: 'govcenters',
        method: 'POST',
        body: item
      })
    } ),
    deleteGovCenter: builder.mutation( {
      query: (id) => ( {
        url: `govcenters/${ id }`,
        method: 'DELETE'
      })
    }),
    updateGovCenter: builder.mutation( {
      query: ({govCenter, id}) => ( {
        url: `govcenters/${ id }`,
        method: 'PUT',
        body: govCenter
      })
    }),
    createPollingCenter: builder.mutation( {
      query: ( item ) => ( {
        url: 'pollingcenters',
        method: 'POST',
        body: item
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
      } ),
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user
      })
    }),
    updateUser: builder.mutation({
      query: ({ user, id }: { user: any, id: string }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: user
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      })
    }),
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `voters/${id}`,
        method: 'DELETE'
      })
    } ),
    updateVoter: builder.mutation({
      query: ({ voter, id }: { voter: any, id: string }) => ({
        url: `voters/${id}`,
        method: 'PUT',
        body: voter
      })
    }),
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
  useUpdateElectoralEntityMutation
} = mutationApi;