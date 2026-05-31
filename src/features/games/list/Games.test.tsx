import { waitForElementToBeRemoved } from "@testing-library/dom";
import type { IGameClientPayload } from "@/features/games/core/domain";
import { gameMockFactory } from "@/features/games/core/test";
import { gamesDriver } from "@/features/games/list/test";
import { Games } from "@/features/games/list/ui";
import { mockDi, renderWithProviders } from "@/tests";

describe("Games", () => {
	describe("sad path", () => {
		it("should handle query error state", async () => {
			const di = mockDi();

			di.clients.game.getGames.mockRejectedValue(new Error("mock-error"));

			renderWithProviders(<Games />, di);

			const skeleton = await gamesDriver.findByTestId("skeleton");
			expect(skeleton).toBeVisible();

			await waitForElementToBeRemoved(skeleton);

			const queryError = await gamesDriver.findByTestId("queryError");
			expect(queryError).toBeVisible();

			expect(gamesDriver.queryByTestId("content")).not.toBeInTheDocument();
			expect(gamesDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});
	});

	describe("happy path", () => {
		it("should handle loading state", async () => {
			const di = mockDi();

			di.clients.game.getGames.mockImplementation(() => new Promise(() => {}));

			renderWithProviders(<Games />, di);

			const skeleton = await gamesDriver.findByTestId("skeleton");
			expect(skeleton).toBeVisible();

			expect(gamesDriver.queryByTestId("content")).not.toBeInTheDocument();
			expect(gamesDriver.queryByTestId("queryError")).not.toBeInTheDocument();
		});

		it("should render returned games", async () => {
			const di = mockDi();

			const data = [
				gameMockFactory.createGame(),
				gameMockFactory.createGame(),
			].map((game, index) => ({
				game,
				mockDate: `mock-date-${index}`,
			}));

			const getGamesResponse: IGameClientPayload["GetGamesResponse"] = data.map(
				(entry) => entry.game,
			);
			di.clients.game.getGames.mockResolvedValue(getGamesResponse);

			di.adapters.date.format.mockImplementation(({ value }) => {
				const entry = data.find((entry) => entry.game.createdAt === value);
				return entry?.mockDate ?? "unknown";
			});

			renderWithProviders(<Games />, di);

			const skeleton = await gamesDriver.findByTestId("skeleton");
			expect(skeleton).toBeVisible();

			await waitForElementToBeRemoved(skeleton);

			const content = await gamesDriver.findByTestId("content");
			expect(content).toBeVisible();

			expect(di.clients.game.getGames).toHaveBeenCalledTimes(1);

			const elements = gamesDriver.getAllWithinByTestId(content, "item");
			expect(elements.length).toBe(getGamesResponse.length);

			for (const [index, element] of elements.entries()) {
				const { game, mockDate } = data[index];

				expect(element).toHaveTextContent(game.name);
				expect(element).toHaveTextContent(mockDate);

				expect(di.adapters.date.format).toHaveBeenCalledWith({
					type: "utc-ms",
					value: game.createdAt,
				});
			}

			expect(gamesDriver.queryByTestId("queryError")).not.toBeInTheDocument();
			expect(gamesDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});

		it("should render empty state when no games are returned", async () => {
			const di = mockDi();

			di.clients.game.getGames.mockResolvedValue([]);

			renderWithProviders(<Games />, di);

			const skeleton = await gamesDriver.findByTestId("skeleton");

			await waitForElementToBeRemoved(skeleton);

			expect(gamesDriver.queryByTestId("content")).toBeInTheDocument();

			const emptyQuery = gamesDriver.queryByTestId("emptyQuery");
			expect(emptyQuery).toBeVisible();

			expect(gamesDriver.queryByTestId("queryError")).not.toBeInTheDocument();

			expect(gamesDriver.queryByTestId("skeleton")).not.toBeInTheDocument();
		});
	});
});
