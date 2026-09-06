import { screen } from "@testing-library/dom";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { renderWithProviders } from "@/tests";
import { BoardGrid } from "./BoardGrid";

const boardTemplate: IBoardTemplate = {
	id: "board-template",
	grid: new Array(5)
		.fill(null)
		.map(() =>
			new Array(5).fill(null).map(() => ({ type: "available" as const })),
		),
};

describe("BoardGrid", () => {
	it("should render 0 as string", () => {
		const values: IBoard["values"] = new Array(5).fill(new Array(5).fill(0));

		renderWithProviders(
			<BoardGrid boardTemplate={boardTemplate} values={values} />,
		);

		expect(screen.queryAllByText("0")).toHaveLength(25);
	});

	it("should skip blocked cells when mapping values", () => {
		const boardTemplateWithBlocked: IBoardTemplate = {
			id: "board-template",
			grid: [
				[{ type: "available" }, { type: "available" }, { type: "blocked" }],
				[{ type: "available" }, { type: "blocked" }, { type: "available" }],
			],
		};

		const values: IBoard["values"] = [
			[1, 2, undefined],
			[3, undefined, 4],
		];

		renderWithProviders(
			<BoardGrid boardTemplate={boardTemplateWithBlocked} values={values} />,
		);

		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("4")).toBeInTheDocument();
	});

	it("should not render values for blocked cells", () => {
		const boardTemplateWithBlocked: IBoardTemplate = {
			id: "board-template",
			grid: [
				[{ type: "available" }, { type: "blocked" }, { type: "available" }],
			],
		};

		const values: IBoard["values"] = [[10, undefined, 20]];

		renderWithProviders(
			<BoardGrid boardTemplate={boardTemplateWithBlocked} values={values} />,
		);

		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("20")).toBeInTheDocument();
	});
});
