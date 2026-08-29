import type { IPlay } from "./play";

export interface IPlayClient {
	create(
		req: IPlayClientPayload["Create"]["Req"],
	): Promise<IPlayClientPayload["Create"]["Res"]>;
	getAllByGameId(
		req: IPlayClientPayload["GetAllByGameId"]["Req"],
	): Promise<IPlayClientPayload["GetAllByGameId"]["Res"]>;
	getById(
		req: IPlayClientPayload["GetById"]["Req"],
	): Promise<IPlayClientPayload["GetById"]["Res"]>;
	takeNumber(
		req: IPlayClientPayload["takeNumber"]["req"],
	): Promise<IPlayClientPayload["takeNumber"]["res"]>;
}

export interface IPlayClientPayload {
	Create: {
		Req: {
			gameId: string;
			name: string;
		};
		Res: {
			id: string;
		};
	};
	GetAllByGameId: {
		Req: {
			gameId: string;
		};
		Res: {
			plays: IPlay[];
		};
	};
	GetById: {
		Req: {
			playId: string;
		};
		Res: {
			play: IPlay;
		};
	};
	takeNumber: {
		req: {
			playId: string;
			takenNumbers: number[];
		};
		res: {
			takenNumbers: number[];
		};
	};
}
