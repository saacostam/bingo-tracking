export interface IBoard {
	id: string;
	name: string;
	values: (number | undefined)[][];
	gameId: string;
}
