import type { IBoardClient } from "@/features/board/core/domain";
import type { IGameClient } from "@/features/game/core/domain";
import type { ILoginClient } from "@/features/login/domain";
import type { IPlayClient } from "@/features/play/core/domain";
import type { IUserClient } from "@/features/user/core/domain";

/**
 * Interface for managing various application clients.
 */
export interface IClients {
	board: IBoardClient;
	game: IGameClient;
	loginClient: ILoginClient;
	play: IPlayClient;
	user: IUserClient;
}
