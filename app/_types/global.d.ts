type Dateable = {
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type Identifiable = {
	id: string;
}

type Gov = Dateable & Identifiable &  {
	name: string;
}

type PollingCenter = Dateable & Identifiable & {
	govCenter: GovCenter;
	name: string;
	serial: string,
	totalObservers: number,
}

type Station = Dateable & Identifiable & {
	pollingCenter: PollingCenter;
	serial: string;
}

type GovCenter = Dateable & Identifiable & {
	gov: Gov;
	name: string
	serial: string
	totalPollingCenters: number
	totalObservers: number
}

type Party = Dateable & Identifiable & {
	name: string;
}

type ElectoralEntity = Dateable & Identifiable & {
	name: string;
	logo: string
}

type Voter = Dateable & Identifiable & {
	name: string;
	pollingCenter: PollingCenter;
	candidate: User;
	address: string,
	serial: string;
	img: string;
	state: number;
	gender: string;
	dateOfBirth: Date;
};

type User = Dateable & Identifiable & {
	name: string;
	username: string;
	gov: Gov;
	electoralEntity: ElectoralEntity;
	govCenter: GovCenter;
	pollingCenter: PollingCenter;
	station: Station;
	role: number;
	email: string;
	phone: string;
	profileImg: string;
	coverImg: string;
	dateOfBirth: Date;
	candidateSerial: number;
	candidateListSerial: number;
	totalPosts: number;
	token: string;
};