import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const ENGLISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// LANGUAGE
	[ILanguageAdapterKey.LANGUAGE_MENU_HEADER]: "Available Languages",

	// LOGIN
	[ILanguageAdapterKey.LOGIN_HEADER]: "Login",
	[ILanguageAdapterKey.LOGIN_DESCRIPTION]: "Lorem ipsum dolor sit met!",
	[ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL]: "Username",
	[ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL]: "Password",
	[ILanguageAdapterKey.LOGIN_SUBMIT_CTA]: "Login",
	[ILanguageAdapterKey.LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER]:
		"Login has not been implemented yet. Any username and password will work.",

	// LOGOUT
	[ILanguageAdapterKey.LOGOUT_BUTTON_CTA]: "Logout",
};
