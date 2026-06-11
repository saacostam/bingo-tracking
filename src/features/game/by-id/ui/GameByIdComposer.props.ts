import type { ComponentType } from "react";
import type { CreateBoardProps } from "@/features/board/create/ui";
import type { DeleteBoardProps } from "@/features/board/delete/ui";
import type { UpdateBoardProps } from "@/features/board/update/ui";
import type { CreatePlayProps } from "@/features/play/create/ui";
import type { GameByIdProps } from "./GameById";

/**
 * UI slots for managing boards.
 *
 * These slots allow the application layer to provide implementations
 * for board-related actions while keeping the feature independent of
 * specific workflows.
 */
export interface IBoardSlots {
	Create: ComponentType<CreateBoardProps>;
	Update: ComponentType<UpdateBoardProps>;
	Delete: ComponentType<DeleteBoardProps>;
}

export interface IGameSlots {
	ById: ComponentType<GameByIdProps>;
}

/**
 * UI slots for managing plays.
 *
 * These slots allow the application layer to provide implementations
 * for play-related actions while keeping the feature independent of
 * specific workflows.
 */
export interface IPlaySlots {
	Create: ComponentType<CreatePlayProps>;
}
