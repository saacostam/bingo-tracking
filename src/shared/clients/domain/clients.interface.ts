import type { IGameClient } from "@/features/game/core/domain";
import type { ILoginClient } from "@/features/login/domain";
import type { ITodoClient } from "@/features/todo/domain";

/**
 * Interface for managing various application clients.
 */
export interface IClients {
	game: IGameClient;
	loginClient: ILoginClient;
	todoClient: ITodoClient;
}
