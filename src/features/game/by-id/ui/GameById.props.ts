import type { ComponentType } from "react";
import type { CreateBoardProps } from "@/features/board/create/ui";
import type { DeleteBoardProps } from "@/features/board/delete/ui";

export interface UpdateBoardSlotProps {
	id: string;
}

/**
 * UI slots for managing boards.
 *
 * These slots allow the application layer to provide implementations
 * for board-related actions while keeping the feature independent of
 * specific workflows.
 */
export interface IBoardSlots {
	Create: ComponentType<CreateBoardProps>;
	Update: ComponentType<UpdateBoardSlotProps>;
	Delete: ComponentType<DeleteBoardProps>;
}
