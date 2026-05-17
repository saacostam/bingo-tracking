export enum ILanguageAdapterLanguage {
	ENGLISH = "English",
}

export interface ILanguageAdapter {
	language: ILanguageAdapterLanguage;
	setLanguage: (language: ILanguageAdapterLanguage) => void;

	get(key: ILanguageAdapterKey): string;
}

export enum ILanguageAdapterKey {
	// LOGIN
	LOGIN_USERNAME_FIELD_LABEL = "LOGIN_USERNAME_FIELD_LABEL",
	LOGIN_PASSWORD_FIELD_LABEL = "LOGIN_PASSWORD_FIELD_LABEL",
	LOGIN_SUBMIT_CTA = "LOGIN_SUBMIT_CTA",
	LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER = "LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER",
}
