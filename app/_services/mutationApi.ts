import { tatweerApi } from "@/app/_services/api";

const mutationApi = tatweerApi.injectEndpoints({
	endpoints: builder => ( {
		uploadFile: builder.mutation( {
			query: (file) => ( {
				url: 'attachments',
				method: 'POST',
				body: file,
			} )
		} ),
		createVoter: builder.mutation( {
			query: (voter) => ( {
				url: 'voters',
				method: 'POST',
				body: voter,
			})
		})
		}),
	overrideExisting: false,
});

export const {useUploadFileMutation, useCreateVoterMutation} = mutationApi;
