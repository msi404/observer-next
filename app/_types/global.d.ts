
type ConfirmedVoters = {
	name: string;
	address: string;
	state: string;
	pollingCenter: string;
	dataEntry: string;
	candidate: string;
	candidateNumber: number;
	cardPhoto: string;
};

type ConfirmedVotersHeader = {
	name: string;
	address: string;
	state: string;
	pollingCenter: string;
	dataEntry: string;
	candidate: string;
	candidateNumber: number;
	cardPhoto: string;
};

type PossibleVoters = {
	name: string;
	address: string;
	state: string;
	pollingCenter: string;
	dataEntry: string;
	candidate: string;
};

type PossibleVotersHeader = {
	name: string;
	address: string;
	state: string;
	pollingCenter: string;
	dataEntry: string;
	candidate: string;
};

type Candidate = {
	name: string;
	phoneNumber: string;
	candidateNumber: number;
	entityName: string;
	state: string;
};

type CandidatesHeader = {
	name: string;
	phoneNumber: string;
	candidateNumber: number;
	entityName: string;
	state: string;
};

type DataEntry = {
	name: string;
	phoneNumber: string;
	state: string;
	entityName: string;
};

type DataEntriesHeader = {
	name: string;
	phoneNumber: string;
	state: string;
	entityName: string;
};

type ElectionResult = {
	photo: string;
	name: string;
	number: number;
	state: string;
	listNumber: number;
	votes: number;
	listIndex: number;
};

type ElectionResultsHeader = {
	photo: string;
	name: string;
	number: number;
	state: string;
	listNumber: number;
	votes: number;
	listIndex: number;
};


type Observer = {
	photo: string;
	name: string;
	phoneNumber: string;
	gender: string;
	dataEntry: string;
	state: string;
	pollingCenter: string;
	stationNumber: number;
};

type ObserversHeader = {
	photo: string;
	name: string;
	phoneNumber: string;
	gender: string;
	dataEntry: string;
	state: string;
	pollingCenter: string;
	stationNumber: number;
};

type StateMangers = {
	name: string;
	phoneNumber: string;
	state: string;
	entityName: string;
};

type StateMangersHeader = {
	name: string;
	phoneNumber: string;
	state: string;
	entityName: string;
};