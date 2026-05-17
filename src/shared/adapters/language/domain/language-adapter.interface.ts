export enum ILanguageAdapterLanguage {
	ENGLISH = "English",
	SPANISH = "Español",
}

export interface ILanguageAdapter {
	language: ILanguageAdapterLanguage;
	setLanguage: (language: ILanguageAdapterLanguage) => void;

	get(key: ILanguageAdapterKey): string;
}

export enum ILanguageAdapterKey {
	// LANGUAGE
	LANGUAGE_MENU_HEADER = "LANGUAGE_MENU_HEADER",

	// LOGIN
	LOGIN_HEADER = "LOGIN_HEADER",
	LOGIN_DESCRIPTION = "LOGIN_DESCRIPTION",
	LOGIN_USERNAME_FIELD_LABEL = "LOGIN_USERNAME_FIELD_LABEL",
	LOGIN_PASSWORD_FIELD_LABEL = "LOGIN_PASSWORD_FIELD_LABEL",
	LOGIN_SUBMIT_CTA = "LOGIN_SUBMIT_CTA",
	LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER = "LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER",
}
