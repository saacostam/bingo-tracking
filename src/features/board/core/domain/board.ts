export interface IBoard {
	id: string;
	name: string;
	grid: [
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
	];
	gameId: string;
}

export type IBoardCell = number;
