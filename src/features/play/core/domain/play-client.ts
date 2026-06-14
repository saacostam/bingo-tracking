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
}
