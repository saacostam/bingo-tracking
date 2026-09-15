import type { IBoardRange, IBoardTemplate } from "@/features/board/core/domain";
import type { IGame, IWithBoards, IWithBoardTemplate } from "./game";

export interface IGameClient {
	createGame(req: IGameClientPayload["createGame"]["req"]): Promise<void>;
	deleteGame(req: IGameClientPayload["deleteGame"]["req"]): Promise<void>;
	getGames(): Promise<IGameClientPayload["getGames"]["res"]>;
	getGameById(
		req: IGameClientPayload["getGameById"]["req"],
	): Promise<IGameClientPayload["getGameById"]["res"]>;
	setBoardTemplate(
		req: IGameClientPayload["setBoardTemplate"]["req"],
	): Promise<void>;
}

export interface IGameClientPayload {
	createGame: {
		req: {
			name: string;
		};
	};
	deleteGame: {
		req: {
			gameId: string;
		};
	};
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
	setBoardTemplate: {
		req: {
			gameId: string;
			boardRange: IBoardRange;
			boardTemplate: Pick<IBoardTemplate, "grid">;
		};
	};
}
