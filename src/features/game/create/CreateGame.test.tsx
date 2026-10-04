import { screen, waitFor } from "@testing-library/dom";
import { type IDepsInjection, mockDi, renderWithProviders } from "@/tests";
import { CreateGame } from "./CreateGame";
import { createGameDriver } from "./create-game-driver";

function mountMock() {
	const di = mockDi();

	const onError = vi.fn();
	const onSettled = vi.fn();
	const onSuccess = vi.fn();

	renderWithProviders(
		<CreateGame
			onError={onError}
			onSettled={onSettled}
			onSuccess={onSuccess}
		/>,
		di as IDepsInjection,
	);

	return {
		di,
		onError,
		onSettled,
		onSuccess,
	};
}

describe("CreateGame", () => {
	it("should create a game", async () => {
		const { di, onError, onSuccess, onSettled } = mountMock();

		await createGameDriver.fill({ name: "Test" });
		await createGameDriver.submit();

		await waitFor(() => {
			expect(
				di.clients.game.createGame({
					name: "Test",
				}),
			);
		});

		expect(onSuccess).toHaveBeenCalledOnce();
		expect(onSettled).toHaveBeenCalledOnce();
		expect(onError).not.toHaveBeenCalled();
	});

	it("should not allow empty name", async () => {
		const { di, onError, onSuccess, onSettled } = mountMock();

		await createGameDriver.fill({ name: "" });
		await createGameDriver.submit();

		const error = screen.getByText(/Name is required/i);
		expect(error).toBeVisible();

		await waitFor(() => {
			expect(di.clients.game.createGame).not.toHaveBeenCalled();
		});

		expect(onError).not.toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();
		expect(onSettled).not.toHaveBeenCalled();
	});

	it("should not allow name higher than 48", async () => {
		const { di, onError, onSuccess, onSettled } = mountMock();

		await createGameDriver.fill({ name: "a".repeat(48 + 1) });
		await createGameDriver.submit();

		const error = screen.getByText(/48/i);
		expect(error).toBeVisible();

		await waitFor(() => {
			expect(di.clients.game.createGame).not.toHaveBeenCalled();
		});

		expect(onError).not.toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();
		expect(onSettled).not.toHaveBeenCalled();
	});
});
