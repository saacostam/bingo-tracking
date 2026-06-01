import { waitForElementToBeRemoved } from "@testing-library/dom";
import { gameByIdDriver } from "@/features/game/by-id/test";
import { GameById } from "@/features/game/by-id/ui";
import { gameMockFactory } from "@/features/game/core/test";
import { mockDi, renderWithProviders } from "@/tests";

describe("GameById", () => {
	const id = "mock-game-id";

	describe("sad path", () => {
		it("should handle query error state", async () => {
			const di = mockDi();

			di.clients.game.getGameById.mockRejectedValue(new Error("mock-error"));

			renderWithProviders(<GameById id={id} />, di);

			const skeleton = await gameByIdDriver.findByTestId("skeleton");
			expect(skeleton).toBeVisible();

			await waitForElementToBeRemoved(skeleton);

			const queryError = await gameByIdDriver.findByTestId("queryError");
			expect(queryError).toBeVisible();

			expect(gameByIdDriver.queryByTestId("content")).not.toBeInTheDocument();
			expect(gameByIdDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});
	});

	describe("happy path", () => {
		it("should handle loading state", async () => {
			const di = mockDi();

			di.clients.game.getGameById.mockImplementation(
				() => new Promise(() => {}),
			);

			renderWithProviders(<GameById id={id} />, di);

			const skeleton = await gameByIdDriver.findByTestId("skeleton");
			expect(skeleton).toBeVisible();

			expect(gameByIdDriver.queryByTestId("content")).not.toBeInTheDocument();
			expect(
				gameByIdDriver.queryByTestId("queryError"),
			).not.toBeInTheDocument();
		});

		it("should render returned game w/ boards", async () => {
			const di = mockDi();

			const game = gameMockFactory.createGameWithBoards();
			const mockDate = "mock-date";

			di.clients.game.getGameById.mockResolvedValue({
				game,
			});
			di.adapters.date.format.mockReturnValue(mockDate);

			renderWithProviders(<GameById id={id} />, di);

			const skeleton = await gameByIdDriver.findByTestId("skeleton");
			await waitForElementToBeRemoved(skeleton);

			const content = await gameByIdDriver.findByTestId("content");
			expect(content).toBeVisible();

			expect(di.clients.game.getGameById).toHaveBeenCalledExactlyOnceWith({
				id,
			});

			expect(content).toHaveTextContent(game.name);
			expect(content).toHaveTextContent(mockDate);

			expect(di.adapters.date.format).toHaveBeenCalledWith({
				type: "utc-ms",
				value: game.createdAt,
			});

			const boards = gameByIdDriver.getAllWithinByTestId(content, "item");
			expect(boards).toHaveLength(game.boards.length);

			expect(
				gameByIdDriver.queryByTestId("queryError"),
			).not.toBeInTheDocument();
			expect(gameByIdDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});

		it("should render returned game w/ no boards", async () => {
			const di = mockDi();

			const game = gameMockFactory.createGameWithBoards({ boards: [] });
			const mockDate = "mock-date";

			di.clients.game.getGameById.mockResolvedValue({
				game,
			});
			di.adapters.date.format.mockReturnValue(mockDate);

			renderWithProviders(<GameById id={id} />, di);

			const skeleton = await gameByIdDriver.findByTestId("skeleton");
			await waitForElementToBeRemoved(skeleton);

			const content = await gameByIdDriver.findByTestId("content");
			expect(content).toBeVisible();

			expect(di.clients.game.getGameById).toHaveBeenCalledExactlyOnceWith({
				id,
			});

			const emptyQuery = gameByIdDriver.queryWithinByTestId(
				content,
				"emptyQuery",
			);
			expect(emptyQuery).toBeInTheDocument();

			expect(di.adapters.date.format).toHaveBeenCalledWith({
				type: "utc-ms",
				value: game.createdAt,
			});

			expect(
				gameByIdDriver.queryByTestId("queryError"),
			).not.toBeInTheDocument();
			expect(gameByIdDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});
	});
});
