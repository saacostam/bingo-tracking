import { useCallback, useMemo, useState } from "react";
import {
	type ILanguageAdapter,
	ILanguageAdapterKey,
	ILanguageAdapterLanguage,
} from "@/shared/adapters/language/domain";

export const ENGLISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// LOGIN
	[ILanguageAdapterKey.LOGIN_HEADER]: "Login",
	[ILanguageAdapterKey.LOGIN_DESCRIPTION]: "Lorem ipsum dolor sit met!",
	[ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL]: "Username",
	[ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL]: "Password",
	[ILanguageAdapterKey.LOGIN_SUBMIT_CTA]: "Login",
	[ILanguageAdapterKey.LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER]:
		"Login has not been implemented yet. Any username and password will work.",
};

export function useLanguageAdapter(): ILanguageAdapter {
	const [language, setLanguage] = useState<ILanguageAdapterLanguage>(
		ILanguageAdapterLanguage.ENGLISH,
	);

	const get: ILanguageAdapter["get"] = useCallback(
		(key) => {
			let keyValuePairs: Record<ILanguageAdapterKey, string>;

			switch (language) {
				case ILanguageAdapterLanguage.ENGLISH: {
					keyValuePairs = ENGLISH_KEY_VALUE_PAIRS;
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
