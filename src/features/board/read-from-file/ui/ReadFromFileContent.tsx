import { Button, Divider, Flex, Grid, Paper, Text } from "@mantine/core";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import { BoardGrid } from "@/features/board/core/ui/BoardGrid";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface ReadFromFileContentProps {
	boardTemplate: IBoardTemplate;
	onUpdateValues: (grid: IBoard["values"]) => void;
	reset: () => void;
	values: IBoard["values"];
}

export function ReadFromFileContent({
	boardTemplate,
	onUpdateValues,
	reset,
	values,
}: ReadFromFileContentProps) {
	const { lang } = useAdapters();

	return (
		<Paper p="md" withBorder>
			<Flex direction="column" gap="md">
				<Flex direction="column" gap={4}>
					<Text size="md" fw="bold">
						{lang.get(ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TITLE)}
					</Text>

					<Text size="sm" c="dimmed">
						{lang.get(ILanguageAdapterKey.READ_FROM_FILE_CONTENT_DESCRIPTION)}
					</Text>
				</Flex>

				<Flex align="center" justify="center">
					<BoardGrid boardTemplate={boardTemplate} values={values} />
				</Flex>

				<Divider />

				<Grid gutter="md">
					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button fullWidth variant="outline" onClick={reset}>
							{lang.get(
								ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TRY_AGAIN_BUTTON_LABEL,
							)}
						</Button>
					</Grid.Col>

					<Grid.Col span={{ base: 12, xs: 6 }}>
						<Button
							fullWidth
							onClick={() => {
								reset();
								onUpdateValues(values);
							}}
						>
							{lang.get(
								ILanguageAdapterKey.READ_FROM_FILE_CONTENT_ACCEPT_BUTTON_LABEL,
							)}
						</Button>
					</Grid.Col>
				</Grid>
			</Flex>
		</Paper>
	);
}
