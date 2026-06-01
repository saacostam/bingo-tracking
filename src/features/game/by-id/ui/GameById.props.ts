import type { ComponentType } from "react";

export interface GameByIdUpdateSlotProps {
	id: string;
}
export interface GameByIdDeleteSlotProps {
	id: string;
}

/**
 * UI slots rendered by the GameById feature.
 *
 * These slots allow the application layer to provide implementations
 * for game-related actions while keeping the feature independent of
 * specific workflows.
 */
export interface GameByIdSlots {
	Create: ComponentType;
	Update: ComponentType<GameByIdUpdateSlotProps>;
	Delete: ComponentType<GameByIdDeleteSlotProps>;
}
