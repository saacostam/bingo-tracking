import { ActionIcon, Flex } from "@mantine/core";
import { useMemo } from "react";
import type { IPlay } from "@/features/play/core/domain";

export interface PlayNumbersContentProps {
	takenNumbers: IPlay["takenNumbers"];
	totalNumbers: number;
}

export function PlayNumbersContent({
	takenNumbers,
	totalNumbers,
}: PlayNumbersContentProps) {
	const content = useMemo(
		() =>
			new Array(totalNumbers).fill(null).map((_, i) => {
				const n = i + 1;
				const isActive = takenNumbers.includes(n);

				return (
					<ActionIcon
						key={n}
						color={isActive ? "indigo" : "gray"}
						fw="bold"
						variant={isActive ? "filled" : "light"}
					>
						{n}
					</ActionIcon>
				);
			}),
		[takenNumbers, totalNumbers],
	);

	return (
		<Flex
			data-testid="play-numbers-content"
			direction="row"
			gap="xs"
			wrap="wrap"
		>
			{content}
		</Flex>
	);
}
