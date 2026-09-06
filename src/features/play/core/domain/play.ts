export interface IPlay {
	id: string;
	gameId: string;
	name: string;
	startedAt: number;
	takenNumbers: number[];
	patterns: IPattern[];
}

export type IPattern = {
	id: string;
	body: boolean[][];
};
