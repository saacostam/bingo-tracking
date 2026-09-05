import { Button, Divider, Flex, Grid, Modal, Title } from "@mantine/core";
import type { ComponentType } from "react";
import type { PlayBoardListProps } from "@/features/play/board-list/ui";
import { usePlayByIdModals } from "@/features/play/by-id/app";
import type { PlayDetailsHeaderProps } from "@/features/play/details-header/ui";
import type { PlayNumbersProps } from "@/features/play/numbers/ui";
import type { PatternsListProps } from "@/features/play/patterns-list/ui";
import type { UpdatePatternsProps } from "@/features/play/update-patterns/ui";

export interface IPatternSlots {
	List: ComponentType<PatternsListProps>;
	Update: ComponentType<UpdatePatternsProps>;
}

export interface IPlaySlots {
	BoardList: ComponentType<PlayBoardListProps>;
	DetailsHeader: ComponentType<PlayDetailsHeaderProps>;
	Numbers: ComponentType<PlayNumbersProps>;
}

export interface PlayByIdComposerProps {
	patternSlots: IPatternSlots;
	playId: string;
	playSlots: IPlaySlots;
}

export function PlayByIdComposer({
	patternSlots,
	playId,
	playSlots,
}: PlayByIdComposerProps) {
	const modal = usePlayByIdModals();

	return (
		<>
			<Flex direction="column" gap="lg">
				<playSlots.DetailsHeader playId={playId} />
				<Divider />
				<Grid gutter="lg">
					<Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
						<Flex direction="column" gap="lg">
							<Flex
								direction="row"
								gap="md"
								justify="space-between"
								wrap="wrap"
							>
								<Title size="h3">Pattern</Title>
								<Button onClick={modal.openUpdatePatterns}>Update</Button>
							</Flex>
							<patternSlots.List playId={playId} />
							<Divider />
							<Title size="h3">Taken Numbers</Title>
							<playSlots.Numbers playId={playId} />
						</Flex>
					</Grid.Col>
					<Grid.Col span={{ base: 12, xs: 6, sm: 8 }}>
						<Flex direction="column" gap="lg">
							<Title size="h3">Boards</Title>
							<playSlots.BoardList playId={playId} />
						</Flex>
					</Grid.Col>
				</Grid>
			</Flex>

			{/* Modals */}
			<Modal
				opened={modal.modal.type === "update-patterns"}
				onClose={modal.close}
				title="Update Patterns"
			>
				<patternSlots.Update playId={playId} />
			</Modal>
		</>
	);
}
