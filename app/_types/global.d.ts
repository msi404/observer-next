type Gov = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type PollingCenter = {
	id: string;
	gov: Gov;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type GovCenter = {
	id: string;
	gov: Gov;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type Party = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type ElectoralEntity = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

type Voter = {
	id: string;
	name: string;
	pollingCenter: PollingCenter;
	candidate: string;
	serial: string;
	img: string;
	state: number;
	gender: string;
	dateOfBirth: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
};

type User = {
	id: string;
	name: string;
	username: string;
	gov: Gov;
	electoralEntity: ElectoralEntity;
	pollingCenter: PollingCenter;
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
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
};