import { ActionIcon, Flex, LoadingOverlay } from "@mantine/core";
import { type ReactNode, useMemo } from "react";
import type { IBoardRange } from "@/features/board/core/domain";
import type { IPlay } from "@/features/play/core/domain";

export interface PlayNumbersContentProps {
	boardRange: IBoardRange;
	isPending: boolean;
	onClickTakenNumber: (takenNumber: number) => void;
	takenNumbers: IPlay["takenNumbers"];
}

export function PlayNumbersContent({
	boardRange,
	isPending,
	onClickTakenNumber,
	takenNumbers,
}: PlayNumbersContentProps) {
	const content = useMemo(() => {
		const content: ReactNode[] = [];

		for (let val = boardRange.min; val <= boardRange.max; val++) {
			const isActive = takenNumbers.includes(val);

			content.push(
				<ActionIcon
					key={val}
					color={isActive ? "indigo" : "gray"}
					fw="bold"
					variant={isActive ? "filled" : "light"}
					onClick={() => onClickTakenNumber(val)}
				>
					{val}
				</ActionIcon>,
			);
		}

		return content;
	}, [boardRange, onClickTakenNumber, takenNumbers]);

	return (
		<Flex
			data-testid="play-numbers-content"
			direction="row"
			gap="xs"
			wrap="wrap"
			pos="relative"
		>
			<LoadingOverlay visible={isPending} />
			{content}
		</Flex>
	);
}
