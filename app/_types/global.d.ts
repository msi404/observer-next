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
}

type GovCenter = Dateable & Identifiable & {
	gov: Gov;
}

type Party = Dateable & Identifiable & {
	name: string;
}

type ElectoralEntity = Dateable & Identifiable & {
	name: string;
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
};