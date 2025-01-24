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
	}),
	overrideExisting: false,
});

