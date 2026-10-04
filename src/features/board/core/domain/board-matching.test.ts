import type { IBoard } from "@/features/board/core/domain/board";
import { mapValuesToBoardTemplate } from "@/features/board/core/domain/board-matching";
import type { IBoardTemplate } from "@/features/board/core/domain/board-template";

const boardTemplate: IBoardTemplate = {
	id: "id",
	boardRange: {
		min: 1,
		max: 4,
	},
	grid: [
		[{ type: "available" }, { type: "blocked" }],
		[{ type: "blocked" }, { type: "available" }],
	],
};

const values: IBoard["values"] = [
	[1, 2],
	[3, undefined],
];

describe("mapValuesToBoardTemplate", () => {
	const testCases = [
		{
			name: "maps available cells with values",
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "available" }]],
			},
			values: [[1]],
			expected: [[{ type: "available", value: 1 }]],
		},
		{
			name: "maps blocked cells without values",
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "blocked" }]],
			},
			values: [[1]],
			expected: [[{ type: "blocked" }]],
		},
		{
			name: "maps undefined values",
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "available" }]],
			},
			values: [[undefined]],
			expected: [[{ type: "available", value: undefined }]],
		},
		{
			name: "maps a mixed grid",
			boardTemplate,
			values,
			expected: [
				[{ type: "available", value: 1 }, { type: "blocked" }],
				[{ type: "blocked" }, { type: "available", value: undefined }],
			],
		},
	] satisfies Array<{
		name: string;
		boardTemplate: IBoardTemplate;
		values: IBoard["values"];
		expected: ReturnType<typeof mapValuesToBoardTemplate>;
	}>;

	it.each(testCases)("$name", ({ boardTemplate, values, expected }) => {
		expect(mapValuesToBoardTemplate(boardTemplate, values)).toEqual(expected);
	});
});
