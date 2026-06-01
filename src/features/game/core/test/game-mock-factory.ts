import { boardMockFactory } from "@/features/board/core/test";
import type { IGame, IWithBoards } from "@/features/game/core/domain";

class GameMockFactory {
	_id = 0;

	_getId() {
		this._id++;
		return this._id;
	}

	createGame(overrides?: Partial<IGame>): IGame {
		const id = this._getId();

		return {
			id: String(id),
			name: `name-${id}`,
			createdAt: id,
			...overrides,
		};
	}

	createGameWithBoards(
		overrides?: Partial<IWithBoards<IGame>>,
	): IWithBoards<IGame> {
		return {
			...this.createGame(),
			boards: [boardMockFactory.createBoard(), boardMockFactory.createBoard()],
			...overrides,
		};
	}
}

export const gameMockFactory = new GameMockFactory();
