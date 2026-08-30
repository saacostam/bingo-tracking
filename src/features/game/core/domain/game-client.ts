import type { IGame, IWithBoards, IWithBoardTemplate } from "./game";

export interface IGameClient {
	getGames(): Promise<IGameClientPayload["getGames"]["res"]>;
	getGameById(
		req: IGameClientPayload["getGameById"]["req"],
	): Promise<IGameClientPayload["getGameById"]["res"]>;
}

export interface IGameClientPayload {
	getGames: {
		res: IGame[];
	};
	getGameById: {
		req: {
			id: string;
		};
		res: {
			game: IWithBoardTemplate<IWithBoards<IGame>>;
		};
	};
}
