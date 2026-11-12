import {
	Anchor,
	Box,
	CheckIcon,
	Container,
	Divider,
	List,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { TableCellsIcon } from "@/shared/icons";

export function Summary() {
	return (
		<Container size="md">
			<Stack gap="xl">
				<Stack gap="xs">
					<ThemeIcon size={42} radius="md" variant="light">
						<TableCellsIcon height={24} width={24} />
					</ThemeIcon>

					<Box>
						<Title order={1}>Bingo Tracker</Title>

						<Text size="xl" c="dimmed">
							Keep your bingo games organized.
						</Text>
					</Box>
				</Stack>

				<Text>
					Bingo Tracker is a simple application for managing bingo games with
					multiple boards and plays. It brings everything together in one place,
					making it easier to organize games, manage boards, and keep track of
					called numbers as each play progresses.
				</Text>

				<Divider />

				<Stack gap="sm">
					<Title order={2}>Manage games, boards, and plays</Title>

					<Text>
						Each game acts as a container for its boards and plays. You can
						create games, add multiple boards, import them from files, and
						configure reusable board templates.
					</Text>

					<Text>
						Within a game, you can run multiple plays independently, define
						winning patterns for each one, and record called numbers as the game
						progresses. This makes it possible to manage different rounds
						without losing track of their individual progress.
					</Text>
				</Stack>

				<Stack gap="sm">
					<Title order={2}>A straightforward structure</Title>

					<Text>
						Bingo Tracker organizes everything around three main concepts:
					</Text>

					<List
						spacing="sm"
						icon={
							<ThemeIcon size={20} radius="xl" variant="light">
								<CheckIcon size={13} />
							</ThemeIcon>
						}
					>
						<List.Item>
							<Text span fw={600}>
								Games
							</Text>
							<Text span>
								{" "}
								hold the boards and plays associated with a session.
							</Text>
						</List.Item>
						<List.Item>
							<Text span fw={600}>
								Boards
							</Text>
							<Text span>
								{" "}
								represent the individual bingo cards participating in a game.
							</Text>
						</List.Item>
						<List.Item>
							<Text span fw={600}>
								Plays
							</Text>
							<Text span>
								{" "}
								track each round, including called numbers and winning patterns.
							</Text>
						</List.Item>
					</List>

					<Text>
						This structure keeps related information together while allowing
						multiple boards and plays to be managed independently.
					</Text>
				</Stack>

				<Divider />

				<Stack gap="sm">
					<Title order={2}>Built with maintainability in mind</Title>

					<Text>
						Beyond its functionality, Bingo Tracker is built around a pragmatic,
						feature-oriented architecture inspired by Clean Architecture.
					</Text>

					<Text>
						The application separates domain logic, application orchestration,
						user interface, and infrastructure. Dependencies remain explicit and
						testable, while features are organized around cohesion rather than
						strict architectural boundaries.
					</Text>

					<Text>
						The goal is a codebase that remains understandable, maintainable,
						and straightforward to extend as the application evolves.
					</Text>

					<Paper p="md" mt="lg" radius="md" withBorder>
						<Text size="sm" c="dimmed">
							Interested in the technical details?
						</Text>
						<Anchor
							href="https://github.com/saacostam/bingo-tracking"
							size="sm"
							fw={600}
						>
							Read the code here
						</Anchor>
					</Paper>
				</Stack>
			</Stack>
		</Container>
	);
}
