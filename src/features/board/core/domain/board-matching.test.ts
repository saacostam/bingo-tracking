import type { IBoard } from "@/features/board/core/domain/board";
import {
	applyPatternToBoard,
	applyPatternToBoardAndGetPercentage,
	mapValuesToBoardTemplate,
} from "@/features/board/core/domain/board-matching";
import type { IBoardTemplate } from "@/features/board/core/domain/board-template";
import type { IPattern } from "@/features/play/core/domain";

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

const pattern: IPattern = {
	id: "pattern-1",
	body: [
		[true, false],
		[false, false],
	],
};

describe("mapValuesToBoardTemplate", () => {
	type TestCase = {
		name: string;
		boardTemplate: IBoardTemplate;
		values: IBoard["values"];
		expected: ReturnType<typeof mapValuesToBoardTemplate>;
	};

	const testCases: TestCase[] = [
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
	];

	it.each(testCases)("$name", ({ boardTemplate, values, expected }) => {
		expect(mapValuesToBoardTemplate(boardTemplate, values)).toEqual(expected);
	});
});

describe("applyPatternToBoard", () => {
	type TestCase = {
		name: string;
		pattern: IPattern;
		boardTemplate: IBoardTemplate;
		values: IBoard["values"];
		expected: ReturnType<typeof applyPatternToBoard>;
	};

	const testCases: TestCase[] = [
		{
			name: "marks matching cells as winning",
			pattern: {
				...pattern,
				body: [[true]],
			},
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "available" }]],
			},
			values: [[1]],
			expected: [[{ type: "available", value: 1, isWinning: true }]],
		},
		{
			name: "marks non-matching cells as not winning",
			pattern: {
				...pattern,
				body: [[false]],
			},
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "available" }]],
			},
			values: [[1]],
			expected: [[{ type: "available", value: 1, isWinning: false }]],
		},
		{
			name: "preserves blocked cells",
			pattern: {
				...pattern,
				body: [[true]],
			},
			boardTemplate: {
				...boardTemplate,
				grid: [[{ type: "blocked" }]],
			},
			values: [[1]],
			expected: [[{ type: "blocked" }]],
		},
	];

	it.each(testCases)("$name", ({
		boardTemplate,
		values,
		pattern,
		expected,
	}) => {
		expect(applyPatternToBoard(boardTemplate, values, pattern)).toEqual(
			expected,
		);
	});
});

describe("applyPatternToBoardAndGetPercentage", () => {
	type TestCase = {
		name: string;
		boardTemplate: IBoardTemplate;
		values: IBoard["values"];
		pattern: IPattern;
		takenNumbers: number[];
		expected: number;
	};

	const testCases: TestCase[] = [
		{
			name: "returns 0 when no winning cells have been taken",
			boardTemplate,
			values,
			pattern,
			takenNumbers: [],
			expected: 0,
		},
		{
			name: "returns 100 when all winning cells have been taken",
			boardTemplate,
			values,
			pattern: {
				...pattern,
				body: [
					[true, false],
					[false, false],
				],
			},
			takenNumbers: [1],
			expected: 100,
		},
		{
			name: "does not exceed 100 when taken numbers contain non-winning cells",
			boardTemplate,
			values,
			pattern,
			takenNumbers: [1, 2, 3, 4],
			expected: 100,
		},
		{
			name: "ignores blocked cells",
			boardTemplate,
			values,
			pattern: {
				...pattern,
				body: [
					[true, false],
					[false, true],
				],
			},
			takenNumbers: [1, 3],
			expected: 100,
		},
		{
			name: "ignores undefined winning cell values",
			boardTemplate,
			values: [
				[1, 2],
				[3, undefined],
			],
			pattern: {
				...pattern,
				body: [
					[true, false],
					[false, true],
				],
			},
			takenNumbers: [1, 2, 3],
			expected: 100,
		},
		{
			name: "returns 0 when there are no winning cells",
			boardTemplate,
			values,
			pattern: {
				...pattern,
				body: [
					[false, false],
					[false, false],
				],
			},
			takenNumbers: [1, 2, 3],
			expected: 0,
		},
	];

	it.each(testCases)("$name", ({
		boardTemplate,
		values,
		pattern,
		takenNumbers,
		expected,
	}) => {
		expect(
			applyPatternToBoardAndGetPercentage(
				boardTemplate,
				values,
				pattern,
				takenNumbers,
			),
		).toBe(expected);
	});
});
