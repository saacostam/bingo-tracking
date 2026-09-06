import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { boardMockFactory } from "@/features/board/core/test";
import { gameMockFactory } from "@/features/game/core/test";
import type { IPattern, IPlay } from "@/features/play/core/domain";
import { renderWithProviders } from "@/tests";
import { PlayBoardListContent } from "./PlayBoardListContent";

function createBoard(id: string, values: number[][]): IBoard {
	return boardMockFactory.createBoard({
		id,
		values,
	});
}

function createBoardTemplate(): IBoardTemplate {
	const { boardTemplate } = gameMockFactory.createGameWithBoards();

	return boardTemplate;
}

const patternWhereAllAreAvailable: IPattern = {
	id: "pattern-1",
	body: [
		[true, true, true, true, true],
		[true, true, true, true, true],
		[true, true, true, true, true],
		[true, true, true, true, true],
		[true, true, true, true, true],
	],
};

describe("PlayBoardListContent", () => {
	it("renders a BoardItem for each board", () => {
		const BoardItem = vi.fn(({ board }) => (
			<div data-testid="board-item">{board.id}</div>
		));

		const boards = [
			createBoard("board-1", [[1, 2, 3]]),
			createBoard("board-2", [[4, 5, 6]]),
		];

		renderWithProviders(
			<PlayBoardListContent
				BoardItem={BoardItem}
				boards={boards}
				boardTemplate={createBoardTemplate()}
				takenNumbers={[]}
				patterns={[patternWhereAllAreAvailable]}
			/>,
		);

		expect(screen.getAllByTestId("board-item")).toHaveLength(2);
		expect(BoardItem).toHaveBeenCalledTimes(2);
	});

	it("sorts boards by completion percentage in descending order", () => {
		const BoardItem = vi.fn(({ board }) => (
			<div data-testid="board-item">{board.id}</div>
		));

		const boards = [
			createBoard("board-1", [[1, 2, 3, 4]]), // 75%
			createBoard("board-2", [[1, 2, 3]]), // 100%
			createBoard("board-3", [[1, 2, 3, 4, 5], [6]]), // 50%
		];

		renderWithProviders(
			<PlayBoardListContent
				BoardItem={BoardItem}
				boards={boards}
				boardTemplate={createBoardTemplate()}
				takenNumbers={[1, 2, 3]}
				patterns={[patternWhereAllAreAvailable]}
			/>,
		);

		const items = screen.getAllByTestId("board-item");

		expect(items.map((item) => item.textContent)).toEqual([
			"board-2",
			"board-1",
			"board-3",
		]);
	});

	it("passes the boardTemplate and takenNumbers to each BoardItem", () => {
		const BoardItem = vi.fn(() => <div data-testid="board-item" />);

		const boardTemplate = createBoardTemplate();
		const takenNumbers: IPlay["takenNumbers"] = [1, 2];

		const boards = [
			createBoard("board-1", [[1, 2, 3]]),
			createBoard("board-2", [[2, 3, 4]]),
		];

		renderWithProviders(
			<PlayBoardListContent
				BoardItem={BoardItem}
				boards={boards}
				boardTemplate={boardTemplate}
				takenNumbers={takenNumbers}
				patterns={[patternWhereAllAreAvailable]}
			/>,
		);

		expect(BoardItem).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({
				board: boards[0],
				boardTemplate,
				takenNumbers,
			}),
			undefined,
		);

		expect(BoardItem).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({
				board: boards[1],
				boardTemplate,
				takenNumbers,
			}),
			undefined,
		);
	});

	it("keeps boards with equal completion percentages in their original order", () => {
		const BoardItem = vi.fn(({ board }) => (
			<div data-testid="board-item">{board.id}</div>
		));

		const boards = [
			createBoard("board-1", [[1, 2, 3, 4]]),
			createBoard("board-2", [[5, 6, 7, 8]]),
			createBoard("board-3", [[9, 10, 11, 12]]),
		];

		renderWithProviders(
			<PlayBoardListContent
				BoardItem={BoardItem}
				boards={boards}
				boardTemplate={createBoardTemplate()}
				takenNumbers={[1, 2]}
				patterns={[patternWhereAllAreAvailable]}
			/>,
		);

		const items = screen.getAllByTestId("board-item");

		expect(items.map((item) => item.textContent)).toEqual([
			"board-1",
			"board-2",
			"board-3",
		]);
	});

	it("renders nothing when there are no boards", () => {
		const BoardItem = vi.fn(() => <div data-testid="board-item" />);

		renderWithProviders(
			<PlayBoardListContent
				BoardItem={BoardItem}
				boards={[]}
				boardTemplate={createBoardTemplate()}
				takenNumbers={[]}
				patterns={[patternWhereAllAreAvailable]}
			/>,
		);

		expect(screen.queryByTestId("board-item")).not.toBeInTheDocument();
		expect(BoardItem).not.toHaveBeenCalled();
	});
});
