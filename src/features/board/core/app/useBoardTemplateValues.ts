import { useMemo } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";

export function computeBoardLayoutValues(
	boardTemplate: IBoardTemplate,
	values: IBoard["values"],
) {
	let valueIndex = 0;

	const valueByPosition = boardTemplate.grid.map((row) =>
		row.map((cell) => {
			if (cell.type === "blocked") {
				return undefined;
			}

			const value = values.at(valueIndex);
			valueIndex += 1;

			return value;
		}),
	);

	return {
		values: values.slice(0, valueIndex),
		valueByPosition,
	};
}

export function useBoardLayoutValues(
	boardTemplate: IBoardTemplate,
	values: IBoard["values"],
) {
	return useMemo(
		() => computeBoardLayoutValues(boardTemplate, values),
		[boardTemplate, values],
	);
}
