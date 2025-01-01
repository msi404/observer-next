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

const createRandomCandidate = () =>
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

export const possibleVotersData = faker.helpers.multiple( createRandomPossibleVoter, { count: 10 } );
export const confirmedVotersData = faker.helpers.multiple( createRandomConfirmedVoter, { count: 10 } );
export const stateManagersData = faker.helpers.multiple( createRandomStateManger, { count: 10 } );
export const candidatesData = faker.helpers.multiple( createRandomCandidate, { count: 10 } );
export const dataEntriesData = faker.helpers.multiple( createRandomDataEntry, { count: 10 } );
export const observersData = faker.helpers.multiple( createRandomObserver, { count: 10 } );
export const issuesChartData = [ createRandomClosedIssues(), createRandomOpenedIssues() ];