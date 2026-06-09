import type { IPlay } from "./play";

export interface IPlayClient {
	create(
		req: IPlayClientPayload["Create"]["Req"],
	): Promise<IPlayClientPayload["Create"]["Res"]>;
	getByGameId(
		req: IPlayClientPayload["GetByGameId"]["Req"],
	): Promise<IPlayClientPayload["GetByGameId"]["Res"]>;
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
	GetByGameId: {
		Req: {
			gameId: string;
		};
		Res: {
			plays: IPlay[];
		};
	};
}
