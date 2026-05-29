import type { NavigateFunction, useLocation, useParams } from "react-router";
import { vi } from "vitest";

export const mockNavigate = vi.fn<NavigateFunction>();
export const mockUseLocation = vi.fn<typeof useLocation>();
export const mockUseParams = vi.fn<typeof useParams>();

vi.mock("react-router", async () => {
	const actual =
		await vi.importActual<typeof import("react-router")>("react-router");

	return {
		...actual,
		useNavigate: () => mockNavigate,
		useLocation: mockUseLocation,
		useParams: () => mockUseParams(),
	};
});
