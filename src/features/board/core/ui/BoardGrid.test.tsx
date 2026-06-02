import { screen } from "@testing-library/dom";
import type { IBoard } from "@/features/board/core/domain";
import { renderWithProviders } from "@/tests";
import { BoardGrid } from "./BoardGrid";

describe("BoardGrid", () => {
	it("should render 0 as string", () => {
		const grid: IBoard["grid"] = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
		];

		renderWithProviders(<BoardGrid grid={grid} />);

		expect(screen.queryAllByText("0")).toHaveLength(24);
	});
});
