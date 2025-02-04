import { tatweerApi } from '@/app/_services/api';

const mutationApi = tatweerApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useUpdateUserMutation
} = mutationApi;
