import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const SPANISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// HOME
	[ILanguageAdapterKey.GAMES_HEADER]: "Juegos",

	// LANGUAGE
	[ILanguageAdapterKey.LANGUAGE_MENU_HEADER]: "Idiomas Disponibles",

	// LOGIN
	[ILanguageAdapterKey.LOGIN_HEADER]: "Iniciar Sesión",
	[ILanguageAdapterKey.LOGIN_DESCRIPTION]: "¡Lorem ipsum dolor sit amet!",
	[ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL]: "Usuario",
	[ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL]: "Contraseña",
	[ILanguageAdapterKey.LOGIN_SUBMIT_CTA]: "Ingresar",
	[ILanguageAdapterKey.LOGIN_MOCK_IMPLEMENTATION_DISCLAIMER]:
		"El inicio de sesión aún no ha sido implementado. Cualquier usuario y contraseña funcionarán.",

	// LOGOUT
	[ILanguageAdapterKey.LOGOUT_BUTTON_CTA]: "Salir",
};
