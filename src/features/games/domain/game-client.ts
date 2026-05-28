import type { IGame } from "./game";

export interface IGameClient {
	getGames(): Promise<IGameClientPayload["GetGamesResponse"]>;
}

export interface IGameClientPayload {
	GetGamesResponse: IGame[];
}
