import { boardMockFactory } from "@/features/board/core/test";
import type {
	IGame,
	IWithBoards,
	IWithBoardTemplate,
} from "@/features/game/core/domain";

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
		overrides?: Partial<IWithBoardTemplate<IWithBoards<IGame>>>,
	): IWithBoardTemplate<IWithBoards<IGame>> {
		return {
			...this.createGame(),
			boards: [boardMockFactory.createBoard(), boardMockFactory.createBoard()],
			boardTemplate: {
				grid: new Array(5)
					.fill(null)
					.map(() =>
						new Array(5).fill(null).map(() => ({ type: "available" })),
					),
			},
			...overrides,
		};
	}
}

export const gameMockFactory = new GameMockFactory();
