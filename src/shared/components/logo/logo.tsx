import { Flex, Text, ThemeIcon } from "@mantine/core";
import { TableCellsIcon } from "@/shared/icons";

export function Logo() {
	return (
		<Flex align="center" gap="xs">
			<ThemeIcon variant="transparent" color="var(--mantine-primary-color-5)">
				<TableCellsIcon />
			</ThemeIcon>
			<Text fw="bold" size="xl">
				<span style={{ color: "var(--mantine-primary-color-5)" }}>D</span>a
				<span style={{ color: "var(--mantine-primary-color-5)" }}>B</span>o
			</Text>
		</Flex>
	);
}
