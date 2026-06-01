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
}

export type IBoardCell = number;
