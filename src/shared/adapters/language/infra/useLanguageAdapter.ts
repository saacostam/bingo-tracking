import { useCallback, useMemo, useState } from "react";
import {
	type ILanguageAdapter,
	type ILanguageAdapterKey,
	ILanguageAdapterLanguage,
} from "@/shared/adapters/language/domain";
import { ENGLISH_KEY_VALUE_PAIRS } from "./english-key-value-pairs";
import { SPANISH_KEY_VALUE_PAIRS } from "./spanish-key-value-pairs";

function getInitialLanguage(): ILanguageAdapterLanguage {
	const languages = navigator.languages.map((l) => l.toLowerCase());

	const hasSpanish = languages.some((l) => l.startsWith("es"));

	return hasSpanish
		? ILanguageAdapterLanguage.SPANISH
		: ILanguageAdapterLanguage.ENGLISH;
}

export function useLanguageAdapter(): ILanguageAdapter {
	const [language, setLanguage] = useState<ILanguageAdapterLanguage>(
		getInitialLanguage(),
	);

	const get: ILanguageAdapter["get"] = useCallback(
		(key) => {
			let keyValuePairs: Record<ILanguageAdapterKey, string>;

			switch (language) {
				case ILanguageAdapterLanguage.ENGLISH: {
					keyValuePairs = ENGLISH_KEY_VALUE_PAIRS;
					break;
				}
				case ILanguageAdapterLanguage.SPANISH: {
					keyValuePairs = SPANISH_KEY_VALUE_PAIRS;
					break;
				}
			}

			return keyValuePairs[key];
		},
		[language],
	);

	return useMemo(
		() => ({
			get,
			language,
			setLanguage,
		}),
		[get, language],
	);
}
