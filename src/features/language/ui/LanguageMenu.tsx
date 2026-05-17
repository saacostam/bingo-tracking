import { ActionIcon, Menu } from "@mantine/core";
import { useCallback } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import {
	ILanguageAdapterKey,
	ILanguageAdapterLanguage,
} from "@/shared/adapters/language/domain";
import { LanguageIcon } from "@/shared/icons";

const iconProps = {
	style: {
		height: "70%",
		width: "70%",
	},
};

export function LanguageMenu() {
	const { lang } = useAdapters();

	const setLanguage = useCallback(
		(language: ILanguageAdapterLanguage) => {
			lang.setLanguage(language);
		},
		[lang.setLanguage],
	);

	return (
		<Menu position="bottom-end">
			<Menu.Target>
				<ActionIcon color="base" size="lg" variant="outline">
					<LanguageIcon {...iconProps} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					{lang.get(ILanguageAdapterKey.LANGUAGE_MENU_HEADER)}
				</Menu.Label>
				{Object.values(ILanguageAdapterLanguage).map((language) => (
					<Menu.Item key={language} onClick={() => setLanguage(language)}>
						{language}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
