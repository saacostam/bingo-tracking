import type { IBoardClient } from "@/features/board/core/domain";
import type { IGameClient } from "@/features/game/core/domain";
import type { ILoginClient } from "@/features/login/domain";
import type { IPlayClient } from "@/features/play/domain";
import type { ITodoClient } from "@/features/todo/domain";

/**
 * Interface for managing various application clients.
 */
export interface IClients {
	board: IBoardClient;
	game: IGameClient;
	loginClient: ILoginClient;
	play: IPlayClient;
	todoClient: ITodoClient;
}
