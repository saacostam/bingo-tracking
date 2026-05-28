import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const ENGLISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// GAMES
	[ILanguageAdapterKey.GAMES_HEADER]: "Games",
	[ILanguageAdapterKey.GAMES_QUERY_GAMES_ERROR_MSG]:
		"Unable to retrieve game information.",
	[ILanguageAdapterKey.GAMES_NO_GAMES_TITLE]: "No Games Found",
	[ILanguageAdapterKey.GAMES_NO_GAMES_DESCRIPTION]:
		"There are currently no games available.",

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

	// QUERY_ERROR
	[ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE]: "Something went wrong!",
};
