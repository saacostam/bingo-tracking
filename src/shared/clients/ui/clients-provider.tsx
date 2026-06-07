import { type PropsWithChildren, useMemo } from "react";
import { useBoardClient } from "@/features/board/core/infra";
import { useGameClient } from "@/features/game/core/infra";
import { useLoginClient } from "@/features/login/infra";
import { usePlayClient } from "@/features/play/core/infra";
import { useTodoClient } from "@/features/todo/infra";
import { ClientsContext } from "../app";
import type { IClients } from "../domain";

/**
 * Provider component to supply application clients to the component tree.
 *
 * This component wraps its children with the necessary context provider (`ClientsContext.Provider`)
 * to make clients available throughout the app.
 *
 * @param {PropsWithChildren} props - The props object containing the children to be rendered.
 *
 * @returns {JSX.Element} A context provider wrapping the children with available clients.
 */
export function ClientsProvider({ children }: PropsWithChildren) {
	const boardClient = useBoardClient();
	const gameClient = useGameClient();
	const loginClient = useLoginClient();
	const playClient = usePlayClient();
	const todoClient = useTodoClient();

	const clients: IClients = useMemo(
		() => ({
			board: boardClient,
			game: gameClient,
			loginClient,
			play: playClient,
			todoClient,
		}),
		[boardClient, gameClient, loginClient, playClient, todoClient],
	);

	return (
		<ClientsContext.Provider value={clients}>
			{children}
		</ClientsContext.Provider>
	);
}
