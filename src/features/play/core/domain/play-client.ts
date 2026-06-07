import type { IPlay } from "./play";

export interface IPlayClient {
	getByGameId(
		req: IPlayClientPayload["GetByGameId"]["Req"],
	): Promise<IPlayClientPayload["GetByGameId"]["Res"]>;
}

export interface IPlayClientPayload {
	GetByGameId: {
		Req: {
			gameId: string;
		};
		Res: {
			plays: IPlay[];
		};
	};
}
