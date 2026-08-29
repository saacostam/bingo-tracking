import type { IGame, IWithBoards, IWithBoardTemplate } from "./game";

export interface IGameClient {
	getGames(): Promise<IGameClientPayload["GetGames"]["Res"]>;
	getGameById(
		req: IGameClientPayload["GetGameById"]["Req"],
	): Promise<IGameClientPayload["GetGameById"]["Res"]>;
}

export interface IGameClientPayload {
	GetGames: {
		Res: IGame[];
	};
	GetGameById: {
		Req: {
			id: string;
		};
		Res: {
			game: IWithBoardTemplate<IWithBoards<IGame>>;
		};
	};
}
