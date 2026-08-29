import { screen } from "@testing-library/dom";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { renderWithProviders } from "@/tests";
import { BoardGrid } from "./BoardGrid";

const boardTemplate: IBoardTemplate = {
	grid: new Array(5)
		.fill(null)
		.map(() =>
			new Array(5).fill(null).map(() => ({ type: "available" as const })),
		),
};

describe("BoardGrid", () => {
	it("should render 0 as string", () => {
		const values: IBoard["values"] = new Array(25).fill(0);

		renderWithProviders(
			<BoardGrid boardTemplate={boardTemplate} values={values} />,
		);

		expect(screen.queryAllByText("0")).toHaveLength(25);
	});
});
