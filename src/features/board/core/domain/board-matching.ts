import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import type { IPattern } from "@/features/play/core/domain";

export function mapValuesToBoardTemplate(
	boardTemplate: IBoardTemplate,
	values: IBoard["values"],
) {
	return boardTemplate.grid.map((row, rowIndex) =>
		row.map((cell, columnIndex) =>
			cell.type === "blocked"
				? {
						type: "blocked" as const,
					}
				: {
						type: "available" as const,
						value: values.at(rowIndex)?.at(columnIndex),
					},
		),
	);
}

export function applyPatternToBoard(
	boardTemplate: IBoardTemplate,
	values: IBoard["values"],
	pattern: IPattern,
) {
	const board = mapValuesToBoardTemplate(boardTemplate, values);

	return board.map((row, rowIndex) =>
		row.map((cell, columnIndex) =>
			cell.type === "available"
				? {
						...cell,
						isWinning: !!pattern.body.at(rowIndex)?.at(columnIndex),
					}
				: cell,
		),
	);
}

export function applyPatternToBoardAndGetPercentage(
	boardTemplate: IBoardTemplate,
	values: IBoard["values"],
	pattern: IPattern,
	takenNumbers: number[],
) {
	const grid = applyPatternToBoard(boardTemplate, values, pattern);

	const isWinningCell = (cell: (typeof grid)[number][number]) =>
		cell.type === "available" && cell.value && cell.isWinning;

	const allWinningCells = grid.flat().filter(isWinningCell);
	const matchedCells = allWinningCells.filter(
		(cell) =>
			isWinningCell(cell) &&
			!!takenNumbers.find((number) => number === cell.value),
	);
	const ratio = Math.max(
		0,
		Math.min(matchedCells.length / allWinningCells.length, 1),
	);

	return ratio * 100;
}
