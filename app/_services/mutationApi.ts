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
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `voters/${id}`,
        method: 'DELETE'
      })
    })
  }),
  overrideExisting: false
});

export const {
  useUploadFileMutation,
  useCreateVoterMutation,
  useDeleteVoterMutation
} = mutationApi;
