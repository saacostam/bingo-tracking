import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const SPANISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// GAMES
	[ILanguageAdapterKey.GAMES_HEADER]: "Juegos",
	[ILanguageAdapterKey.GAMES_QUERY_GAMES_ERROR_MSG]:
		"No se pudieron cargar los datos de los juegos.",
	[ILanguageAdapterKey.GAMES_NO_GAMES_TITLE]: "No se encontraron juegos",
	[ILanguageAdapterKey.GAMES_NO_GAMES_DESCRIPTION]:
		"Actualmente no hay juegos disponibles",

	// GAME BY ID
	[ILanguageAdapterKey.GAME_BY_ID_BOARDS_HEADER]: "Cartones",
	[ILanguageAdapterKey.GAME_BY_ID_BOARDS_DESCRIPTION]:
		"Los cartones creados para este juego",
	[ILanguageAdapterKey.GAME_BY_ID_QUERY_GAME_ERROR_MSG]:
		"No se pudo obtener la información del juego",

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

	// QUERY_ERROR
	[ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE]: "Se produjo un error.",
	[ILanguageAdapterKey.QUERY_ERROR_RETRY_LABEL]: "Reintentar",
};
