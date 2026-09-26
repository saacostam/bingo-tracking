export interface IUserClient {
	getCapabilities(): Promise<IUserClientPayload["getCapabilities"]["res"]>;
}

export interface IUserClientPayload {
	getCapabilities: {
		res: {
			vision: boolean;
		};
	};
}
