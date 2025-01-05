import { fakerAR as faker } from '@faker-js/faker';
const createRandomPossibleVoter = () =>
{ 
	return {
		name: faker.person.fullName(),
		address: faker.location.streetAddress(),
		state: faker.location.state(),
		pollingCenter: faker.location.city(),
		dataEntry: faker.internet.username(),
		candidate: faker.person.fullName(),
	};
};
const createRandomConfirmedVoter = () =>
{ 
	return {
		name: faker.person.fullName(),
		address: faker.location.streetAddress(),
		state: faker.location.state(),
		pollingCenter: faker.location.city(),
		dataEntry: faker.internet.username(),
		candidate: faker.person.fullName(),
		candidateNumber: faker.number.int( { min: 1, max: 100 } ),
		cardPhoto: faker.image.avatarGitHub(),
	};
};

const createRandomStateManger = () =>
{
	return {
		name: faker.person.fullName(),
		phoneNumber: faker.phone.number(),
		state: faker.location.state(),
		entityName: faker.company.name(),
	};
}

const createRandomElectionResults = () =>
{
	return {
		photo: faker.image.avatar(),	
		name: faker.person.fullName(),
		number: faker.number.int( { min: 1, max: 100 } ),
		state: faker.location.state(),
		listNumber: faker.number.int( { min: 1, max: 1000 } ),
		votes: faker.number.int( { min: 1, max: 9999 } ),
		listIndex: faker.number.int( { min: 1, max: 100 } ),
	};
}

const createRandomDataEntry = () =>
{
	return {
		name: faker.person.fullName(),
		phoneNumber: faker.phone.number(),
		entityName: faker.company.name(),
		state: faker.location.state(),
		stateManger: faker.person.fullName(),
	};
}

const createRandomObserver = () =>
{
	return {
		photo: faker.image.avatar(),
		name: faker.person.fullName(),
		phoneNumber: faker.phone.number(),
		gender: faker.helpers.arrayElement( [ 'ذكر', 'أنثى' ] ),
		dataEntry: faker.person.fullName(),
		state: faker.location.state(),
		pollingCenter: faker.location.city(),
		stationNumber: faker.number.int( { min: 1, max: 100 } ),
	};
}

const createRandomCandidate = () =>
{
	return {
		name: faker.person.fullName(),
		phoneNumber: faker.phone.number(),
		candidateNumber: faker.number.int( { min: 1, max: 100 } ),
		entityName: faker.company.name(),
		state: faker.location.state(),
	}
}

const createRandomClosedIssues = () =>
{
	return (
	{
		type: "closed",
		total: faker.number.int( { min: 1, max: 999 } ),
		fill: "var(--color-closed)",
	}
	)
}

const createRandomOpenedIssues = () =>
{
	return (
	{
		type: "opened",
		total: faker.number.int( { min: 1, max: 999 } ),
		fill: "var(--color-opened)",
	}
	)
}

const createRandomCandidatesAcitvities = () =>
{ 
	return Array.from({ length: 12 }, (_, i) => ({
			month: new Date(0, i).toLocaleString('default', { month: 'long' }),
			candidatesActivities: faker.number.int({ min: 1, max: 100 })
		}));
} 

const createRandomObserversPerState = () =>
{ 
	const governorates = [
		"بغداد", "البصرة", "نينوى", "أربيل", "السليمانية", "دهوك", "كركوك", "النجف", "كربلاء", "بابل", 
		"الأنبار", "ديالى", "واسط", "ميسان", "ذي قار", "المثنى", "القادسية", "صلاح الدين"
	];

return governorates.map(governorate => ({
	governorate,
	numberOfObservers: faker.number.int({ min: 1, max: 100 })
}));
}

export const possibleVotersData = faker.helpers.multiple( createRandomPossibleVoter, { count: 10 } );
export const confirmedVotersData = faker.helpers.multiple( createRandomConfirmedVoter, { count: 10 } );
export const stateManagersData = faker.helpers.multiple( createRandomStateManger, { count: 10 } );
export const electionResultsData = faker.helpers.multiple( createRandomElectionResults, { count: 10 } );
export const dataEntriesData = faker.helpers.multiple( createRandomDataEntry, { count: 10 } );
export const observersData = faker.helpers.multiple( createRandomObserver, { count: 10 } );
export const candidatesData =	faker.helpers.multiple( createRandomCandidate, { count: 10 } );
export const issuesChartData = [ createRandomClosedIssues(), createRandomOpenedIssues() ];
export const candidatesActivitiesData = createRandomCandidatesAcitvities();
export const observersPerStateData = createRandomObserversPerState();