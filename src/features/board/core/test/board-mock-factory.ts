import type { IBoard } from "@/features/board/core/domain";

class BoardMockFactory {
	_id = 0;
	_cell = 0;

	_getId() {
		this._id++;
		return this._id;
	}

	_getCell() {
		this._cell++;
		return this._cell;
	}

	createBoard(overrides?: Partial<IBoard>): IBoard {
		const id = this._getId();

		return {
			id: String(id),
			name: `board-${id}`,
			grid: [
				[
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
				],
				[
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
				],
				[this._getCell(), this._getCell(), this._getCell(), this._getCell()],
				[
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
				],
				[
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
					this._getCell(),
				],
			],
			gameId: String(id),
			...overrides,
		};
	}
}

export const boardMockFactory = new BoardMockFactory();
