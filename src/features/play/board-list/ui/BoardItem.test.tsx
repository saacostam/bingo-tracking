import { Grid } from "@mantine/core";
import { screen } from "@testing-library/dom";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import type { IPattern } from "@/features/play/core/domain";
import { renderWithProviders } from "@/tests";
import { BoardItem } from "./BoardItem";

const boardTemplate: IBoardTemplate = {
	id: "board-template-id",
	grid: [
		[{ type: "available" }, { type: "available" }],
		[{ type: "available" }, { type: "blocked" }],
	],
	boardRange: {
		min: 1,
		max: 75,
	},
};

const board: IBoard = {
	id: "board-1",
	name: "Test Board",
	values: [
		[1, 2],
		[3, undefined],
	],
	gameId: "game-id-1",
};

const fullPattern: IPattern = {
	id: "pattern-1",
	body: boardTemplate.grid.map((row) => row.map(() => true)),
};

function renderBoardItem(
	overrides: Partial<React.ComponentProps<typeof BoardItem>> = {},
) {
	const props: React.ComponentProps<typeof BoardItem> = {
		board,
		boardTemplate,
		takenNumbers: [],
		name: "test-name",
		pattern: fullPattern,
		...overrides,
	};

	return renderWithProviders(
		<Grid>
			<BoardItem {...props} />
		</Grid>,
	);
}

describe("BoardItem", () => {
	it("should render values according to the board layout", () => {
		renderBoardItem();

		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("should not consume a value for a blocked cell", () => {
		renderBoardItem({
			board: {
				...board,
				values: [
					[1, 2],
					[3, 4],
				],
			},
		});

		const badges = screen.getAllByText(/^[123]$/);

		expect(badges).toHaveLength(3);
		expect(screen.queryByText("4")).not.toBeInTheDocument();
	});

	it("should calculate completion percentage using only values in the layout", () => {
		renderBoardItem({
			takenNumbers: [1, 3],
		});

		expect(screen.getByText("66.7%")).toBeInTheDocument();
	});

	it("should ignore values beyond the layout when calculating completion", () => {
		renderBoardItem({
			board: {
				...board,
				values: [[1, 2, 3, 4, 5]],
			},
			takenNumbers: [1, 4],
		});

		expect(screen.getByText("33.3%")).toBeInTheDocument();
	});
});
