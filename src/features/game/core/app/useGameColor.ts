import type { MantineColor } from "@mantine/core";

const colors: MantineColor[] = ["green", "blue", "violet", "orange", "pink"];

/**
 * Returns a deterministic color based on a numeric value.
 *
 * Intended for lightweight visual differentiation between games.
 *
 * The same input value will always produce the same color.
 */
export function useGameColor(value: number): MantineColor {
	const index = Math.floor(Math.max(0, value)) % colors.length;
	return colors[index];
}
