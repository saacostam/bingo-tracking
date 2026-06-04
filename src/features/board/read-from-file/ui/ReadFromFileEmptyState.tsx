import { FileInput, Flex, Paper, Text } from "@mantine/core";

export interface ReadFromFileEmptyStateProps {
	file: File | null;
	setFile: (file: File | null) => void;
}

export function ReadFromFileEmptyState({
	file,
	setFile,
}: ReadFromFileEmptyStateProps) {
	return (
		<Paper p="xl" withBorder>
			<Flex direction="column" gap="md" align="center">
				<Text size="lg" fw="bold">
					Read board from image
				</Text>

				<Text size="sm" c="dimmed" ta="center">
					Upload an image and the board will be detected automatically for
					review.
				</Text>

				<FileInput
					value={file}
					onChange={setFile}
					accept="image/*"
					placeholder="Select image"
					style={{ width: "100%" }}
				/>
			</Flex>
		</Paper>
	);
}
