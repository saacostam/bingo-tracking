import { Driver } from "@/tests/driver";

const gameByIdSelector = {
	content: {
		default: "game-by-id-content",
	},
	item: {
		default: "board-item",
	},
	queryError: {
		default: "query-error",
	},
	skeleton: {
		default: "game-by-id-skeleton",
	},
};

class GameByIdDriver extends Driver<typeof gameByIdSelector> {
	constructor() {
		super(gameByIdSelector);
	}
}

export const gameByIdDriver = new GameByIdDriver();
