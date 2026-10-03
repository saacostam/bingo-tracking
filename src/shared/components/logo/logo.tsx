import { Flex, Text, ThemeIcon } from "@mantine/core";
import { TableCellsIcon } from "@/shared/icons";

export function Logo() {
	return (
		<Flex align="center" gap="xs">
			<ThemeIcon variant="transparent" color="var(--mantine-primary-color-5)">
				<TableCellsIcon />
			</ThemeIcon>
			<Text fw="bold" size="xl">
				Bingo
				<span style={{ color: "var(--mantine-primary-color-5)" }}>Kit</span>
			</Text>
		</Flex>
	);
}
