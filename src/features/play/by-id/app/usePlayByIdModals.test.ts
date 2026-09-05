import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePlayByIdModals } from "./usePlayByIdModals";

describe("usePlayByIdModals", () => {
	it("starts with no modal open", () => {
		const { result } = renderHook(() => usePlayByIdModals());

		expect(result.current.modal).toEqual({
			type: "none",
		});
	});

	it("opens the update patterns modal", () => {
		const { result } = renderHook(() => usePlayByIdModals());

		act(() => {
			result.current.openUpdatePatterns();
		});

		expect(result.current.modal).toEqual({
			type: "update-patterns",
		});
	});

	it("closes the modal", () => {
		const { result } = renderHook(() => usePlayByIdModals());

		act(() => {
			result.current.openUpdatePatterns();
			result.current.close();
		});

		expect(result.current.modal).toEqual({
			type: "none",
		});
	});
});
