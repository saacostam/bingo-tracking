import { describe, expect, it } from "vitest";
import { computeCompletionPercentage } from "./compute-completion-percentage";

describe("computeCompletionPercentage", () => {
	it("returns the percentage of board numbers that have been taken", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3, 4],
			takenNumbers: [1, 2],
		});

		expect(result).toBe(50);
	});

	it("returns 0 when no board numbers have been taken", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3, 4],
			takenNumbers: [],
		});

		expect(result).toBe(0);
	});

	it("returns 100 when all board numbers have been taken", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3, 4],
			takenNumbers: [1, 2, 3, 4],
		});

		expect(result).toBe(100);
	});

	it("ignores taken numbers that are not on the board", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3, 4],
			takenNumbers: [1, 2, 5, 6],
		});

		expect(result).toBe(50);
	});

	it("rounds the result to two decimal places", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3],
			takenNumbers: [1],
		});

		expect(result).toBe(33.33);
	});

	it("does not count duplicate taken numbers more than once", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2, 3],
			takenNumbers: [1, 1, 1],
		});

		expect(result).toBe(33.33);
	});

	it("handles duplicate board numbers according to board occurrences", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 1, 2, 3],
			takenNumbers: [1],
		});

		expect(result).toBe(50);
	});

	it("returns 100 when takenNumbers contains more matches than the board", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [1, 2],
			takenNumbers: [1, 2, 3, 4],
		});

		expect(result).toBe(100);
	});

	it("returns NaN for an empty board", () => {
		const result = computeCompletionPercentage({
			boardNumbers: [],
			takenNumbers: [],
		});

		expect(result).toBeNaN();
	});
});
