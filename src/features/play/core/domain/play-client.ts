import type { IPattern, IPlay } from "./play";

export interface IPlayClient {
	create(
		req: IPlayClientPayload["create"]["req"],
	): Promise<IPlayClientPayload["create"]["res"]>;
	delete(req: IPlayClientPayload["delete"]["req"]): Promise<void>;
	getAllByGameId(
		req: IPlayClientPayload["getAllByGameId"]["req"],
	): Promise<IPlayClientPayload["getAllByGameId"]["res"]>;
	getById(
		req: IPlayClientPayload["getById"]["req"],
	): Promise<IPlayClientPayload["getById"]["res"]>;
	takeNumber(req: IPlayClientPayload["takeNumber"]["req"]): Promise<void>;
	updatePatterns(
		req: IPlayClientPayload["updatePatterns"]["req"],
	): Promise<void>;
}

export interface IPlayClientPayload {
	create: {
		req: {
			gameId: string;
			name: string;
		};
		res: {
			id: string;
		};
	};
	delete: {
		req: {
			playId: string;
		};
	};
	getAllByGameId: {
		req: {
			gameId: string;
		};
		res: {
			plays: IPlay[];
		};
	};
	getById: {
		req: {
			playId: string;
		};
		res: {
			play: IPlay;
		};
	};
	takeNumber: {
		req: {
			playId: string;
			takenNumbers: number[];
		};
	};
	updatePatterns: {
		req: {
			playId: string;
			patterns: IPattern["body"][];
		};
	};
}
