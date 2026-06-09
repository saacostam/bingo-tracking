import type { IPlay } from "./play";

export interface IPlayClient {
	create(
		req: IPlayClientPayload["Create"]["Req"],
	): Promise<IPlayClientPayload["Create"]["Res"]>;
	getAllByGameId(
		req: IPlayClientPayload["GetAllByGameId"]["Req"],
	): Promise<IPlayClientPayload["GetAllByGameId"]["Res"]>;
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
}
