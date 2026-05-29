import { Driver } from "@/tests/driver";

const expensesBreakdownSelector = {
	content: {
		default: "games-content",
	},
	emptyQuery: {
		default: "empty-query",
	},
	queryError: {
		default: "query-error",
	},
	skeleton: {
		default: "games-skeleton",
	},
};

class GamesDriver extends Driver<typeof expensesBreakdownSelector> {
	constructor() {
		super(expensesBreakdownSelector);
	}
}

export const gamesDriver = new GamesDriver();
