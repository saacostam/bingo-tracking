import type { IPlay } from "./play";

export interface IPlayClient {
	create(req: IPlayClientPayload["Create"]["Req"]): Promise<void>;
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
