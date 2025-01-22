import { tatweerApi } from "@/app/_services/api";

const mutationApi = tatweerApi.injectEndpoints({
	endpoints: builder => ({
		addElectoralEntity: builder.mutation({
			query: dto => ({
				url: "ElectoralEntity/add",
				method: "POST",
				body: dto,
			}),
		}),
		addElectoralEntityAdmin: builder.mutation({
			query: dto => ({
				url: "ElectoralEntityAdmin/Add",
				method: "POST",
				body: dto,
			}),
		}),
		addDataEntry: builder.mutation({
			query: dto => ({
				url: "DataEntry/Add",
				method: "POST",
				body: dto,
			}),
		}),
		addCandidate: builder.mutation({
			query: dto => ({
				url: "Candidate/Add",
				method: "POST",
				body: dto,
			}),
		}),
		addVoter: builder.mutation({
			query: dto => ({
				url: "Voter/Add",
				method: "POST",
				body: dto,
			}),
		}),
		addRegistrationCenter: builder.mutation({
			query: dto => ({
				url: "RegistrationCenter/Add",
				method: "POST",
				body: dto,
			}),
		} ),
		addPost: builder.mutation( {
			query: dto => ( {
				url: 'Post/Add',
				method: 'POST',
				body: dto
			})
		}),
		deleteElectoralEntity: builder.mutation({
			query: dto => ({
				url: `ElectoralEntity/Delete/${dto.id}`,
				method: "DELETE",
			}),
		}),
		updateElectoralEntity: builder.mutation({
			query: dto => ({
				url: `ElectoralEntity/Update/${dto.id}`,
				method: "PUT",
				body: dto.body,
			}),
		}),
		deleteElectoralEntityAdmin: builder.mutation({
			query: dto => ({
				url: `ElectoralEntityAdmin/Delete/${dto.id}`,
				method: "DELETE",
			}),
		}),
		updateElectoralEntityAdmin: builder.mutation({
			query: dto => ({
				url: `ElectoralEntityAdmin/Update/${dto.id}`,
				method: "PUT",
				body: dto.body
			}),
		} ),
		uploadFile: builder.mutation( {
			query: dto => ( {
				url: 'File/Add',
				method: 'POST',
				headers: {
				'Content-Type': 'multipart/form-data'
				},
				body: dto
			})
		})
	}),
	overrideExisting: false,
});

export const {
	useAddElectoralEntityMutation,
	useAddElectoralEntityAdminMutation,
	useAddDataEntryMutation,
	useAddCandidateMutation,
	useAddVoterMutation,
	useAddRegistrationCenterMutation,
	useDeleteElectoralEntityMutation,
	useUpdateElectoralEntityMutation,
	useAddPostMutation,
	useUploadFileMutation
} = mutationApi;
