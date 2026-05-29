import type { IGame } from "@/features/games/domain";

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
}

export const gameMockFactory = new GameMockFactory();
