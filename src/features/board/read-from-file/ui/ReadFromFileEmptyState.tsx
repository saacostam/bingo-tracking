import { FileInput, Flex, Paper, Text } from "@mantine/core";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export interface ReadFromFileEmptyStateProps {
	file: File | null;
	setFile: (file: File | null) => void;
}

export function ReadFromFileEmptyState({
	file,
	setFile,
}: ReadFromFileEmptyStateProps) {
	const { lang } = useAdapters();

	return (
		<Paper p="xl" withBorder>
			<Flex direction="column" gap="md" align="center">
				<Text size="lg" fw="bold">
					{lang.get(ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_TITLE)}
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					{lang.get(ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_DESCRIPTION)}
				</Text>

				<FileInput
					value={file}
					onChange={setFile}
					accept="image/*"
					placeholder={lang.get(
						ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_INPUT_PLACEHOLDER,
					)}
					style={{ width: "100%" }}
				/>
			</Flex>
		</Paper>
	);
}
