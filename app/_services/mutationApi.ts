import { tatweerApi } from "@/app/_services/api";

const mutationApi = tatweerApi.injectEndpoints({
	endpoints: builder => ({
		createElectoralEntity: builder.mutation({
			query: dto => ({
				url: "ElectoralEntity/add",
				method: "POST",
				body: dto,
			}),
		}),
		createElectoralEntityAdmin: builder.mutation({
			query: dto => ({
				url: "ElectoralEntityAdmin/Add",
				method: "POST",
				body: dto,
			}),
		}),
		createDataEntry: builder.mutation({
			query: dto => ({
				url: "DataEntry/Add",
				method: "POST",
				body: dto,
			}),
		}),
		createCandidate: builder.mutation({
			query: dto => ({
				url: "Candidate/Add",
				method: "POST",
				body: dto,
			}),
		}),
		createRegistrationCenter: builder.mutation({
			query: dto => ({
				url: "RegistrationCenter/Add",
				method: "POST",
				body: dto,
			}),
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
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreateElectoralEntityMutation,
	useCreateElectoralEntityAdminMutation,
	useCreateDataEntryMutation,
	useCreateCandidateMutation,
	useCreateRegistrationCenterMutation,
	useDeleteElectoralEntityMutation,
	useUpdateElectoralEntityMutation,
} = mutationApi;
