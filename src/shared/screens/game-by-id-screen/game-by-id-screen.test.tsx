/** biome-ignore-all assist/source/organizeImports: mock router hooks */
import { mockNavigate, mockUseParams } from "@/tests/mocks";

import { GameByIdScreenController } from "@/shared/screens/game-by-id-screen";
import { mockDi, renderWithProviders, type IDepsInjection } from "@/tests";
import { genRoute, RouteName } from "@/shared/router/app";

describe("GameByIdScreenController", () => {
	beforeEach(() => {
		mockNavigate.mockReset();
	});

	describe("redirect cases", () => {
		it.each([
			{
				label: "undefined",
				id: undefined,
			},
			{
				label: "null",
				id: null,
			},
			{
				label: "empty string",
				id: "",
			},
		])("should redirect if id is $label", ({ id }) => {
			const di = mockDi();

			const mockGameById = vi.fn();

			mockUseParams.mockImplementation(() => ({ id: id as string }));

			renderWithProviders(
				<GameByIdScreenController GameById={mockGameById} />,
				di as IDepsInjection,
			);

			expect(mockNavigate).toHaveBeenCalledWith(
				genRoute({
					name: RouteName.HOME,
				}),
			);
			expect(mockGameById).not.toHaveBeenCalled();
		});
	});

	it("should render GameById when id is defined", () => {
		const di = mockDi();

		const mockId = "mock-id";

		const mockGameById = vi.fn();

		mockUseParams.mockImplementation(() => ({ id: mockId }));

		renderWithProviders(
			<GameByIdScreenController GameById={mockGameById} />,
			di as IDepsInjection,
		);

		const gameByIdProps = {
			id: mockId,
		};
		expect(mockGameById).toHaveBeenCalledWith(gameByIdProps, undefined);
		expect(mockNavigate).not.toHaveBeenCalled();
	});
});
