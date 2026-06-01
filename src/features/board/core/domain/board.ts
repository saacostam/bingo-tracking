export interface IBoard {
	id: string;
	grid: [
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
		[IBoardCell, IBoardCell, IBoardCell, IBoardCell, IBoardCell],
	];
}

export type IBoardCell = number;
