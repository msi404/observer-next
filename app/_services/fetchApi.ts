import { tatweerApi } from "@/app/_services/api";

const fetchDataApi = tatweerApi.injectEndpoints({
	endpoints: builder => ({
		profile: builder.query({
			query: () => "User/GetProfile",
		}),
		electoralEntityAdminProfile: builder.query({
			query: () => "ElectoralEntityAdmin/GetProfile",
		}),
		electoralEntityAdmin: builder.query({
			query: () => "ElectoralEntity/Gets",
		}),
		governorateAdmin: builder.query({
			query: () => "GovernorateAdmin/Gets",
		}),
		dataEntry: builder.query({
			query: () => "DataEntry/Gets",
		}),
		electoralEntity: builder.query({
			query: () => "ElectoralEntity/Gets",
		}),
		governorate: builder.query({
			query: () => "Governorate/Gets",
		}),
		candidate: builder.query({
			query: () => "Candidate/Gets",
		}),
		candidateProfile: builder.query({
			query: () => "Candidate/GetProfile",
		}),
		registrationCenter: builder.query({
			query: () => "RegistrationCenter/Gets",
		}),
		superAdminStatistics: builder.query({
			query: () => "HomePage/SupperAdminStatistic",
		}),
		statistics: builder.query({
			query: () => "Dashborad/GetStatistics",
		}),
		complaintStatistics: builder.query({
			query: () => "Dashborad/GetComplaintStatistics",
		}),
		governorateStatistics: builder.query({
			query: () => "Dashborad/GetGovernorateStatistics",
		}),
		governorateObserverStatistic: builder.query({
			query: () => "HomePage/GovernorateObserverStatistic",
		}),
		ageVoterStatistic: builder.query({
			query: () => "HomePage/AgeVoterStatistic",
		}),
		candidateStatistics: builder.query({
			query: () => "Dashborad/CandidateStatistics",
		}),
		electionResultsStatistic: builder.query({
			query: () => "ElectionResults/Statistic",
		}),
		electionResults: builder.query({
			query: () => "ElectionResults/Gets",
		}),
		observer: builder.query({
			query: () => "Observer/Gets",
		}),
		voter: builder.query({
			query: () => "Voter/Gets",
		}),
		post: builder.query({
			query: () => "Post/Gets",
		}),
		complaint: builder.query({
			query: () => "Complaint/Gets",
		}),
		notifications: builder.query({
			query: () => "Notifications/Gets",
		}),
	}),
	overrideExisting: false,
});

export const {
	useProfileQuery,
	useElectoralEntityAdminProfileQuery,
	useElectoralEntityAdminQuery,
	useGovernorateAdminQuery,
	useDataEntryQuery,
	useElectoralEntityQuery,
	useGovernorateQuery,
	useCandidateQuery,
	useCandidateProfileQuery,
	useRegistrationCenterQuery,
	useSuperAdminStatisticsQuery,
	useStatisticsQuery,
	useComplaintStatisticsQuery,
	useGovernorateStatisticsQuery,
	useGovernorateObserverStatisticQuery,
	useAgeVoterStatisticQuery,
	useCandidateStatisticsQuery,
	useElectionResultsStatisticQuery,
	useElectionResultsQuery,
	useObserverQuery,
	useVoterQuery,
	usePostQuery,
	useComplaintQuery,
	useNotificationsQuery,
} = fetchDataApi;
