import { tatweerApi } from '@/app/_services/api';

const fetchDataApi = tatweerApi.injectEndpoints( {
	endpoints: ( build ) => ( {
		electoralEntityAdmin: build.query( {
			query: () => 'ElectoralEntity/Gets'
		} ),
		governorateAdmin: build.query( {
			query: () => 'GovernorateAdmin/Gets'
		} ),
		dataEntry: build.query( {
			query: () => 'DataEntry/Gets'
		} ),
		electoralEntity: build.query( {
			query: () => 'ElectoralEntity/Gets'
		}),
		governorate: build.query( {
			query: () => 'Governorate/Gets'
		}),
		candidate: build.query( {
			query: () => 'Candidate/Gets'
		} ),
		candidateProfile: build.query( {
			query: () => 'Candidate/GetProfile'
		}),
		registrationCenter: build.query( {
			query: () => 'RegistrationCenter/Gets'
		} ),
		statistics: build.query( {
			query: () => '"Dashborad/GetStatistics'
		} ),
		complaintStatistics: build.query( {
			query: () => 'Dashborad/GetComplaintStatistics'
		} ),
		governorateStatistics: build.query( {
			query: () => 'Dashborad/GetGovernorateStatistics'
		}),
		governorateObserverStatistic: build.query( {
			query: () => 'HomePage/GovernorateObserverStatistic'
		} ),
		ageVoterStatistic: build.query( {
			query: () => 'HomePage/AgeVoterStatistic'
		}),
		candidateStatistics: build.query( {
			query: () => 'Dashborad/CandidateStatistics'
		} ),
		electionResultsStatistic: build.query( {
			query: () => 'ElectionResults/Statistic'
		} ),
		electionResults: build.query( {
			query: () => 'ElectionResults/Gets'
		}),
		observer: build.query( {
			query: () => 'Observer/Gets'
		} ),
		voter: build.query( {
			query: () => 'Voter/Gets'
		}),
		post: build.query( {
			query: () => 'Post/Gets'
		} ),
		complaint: build.query( {
			query: () => 'Complaint/Gets'
		}),
		notifications: build.query( {
			query: () => 'Notifications/Gets'
		})
	} ),
	overrideExisting: false
} );

export const {useDataEntryQuery} = fetchDataApi