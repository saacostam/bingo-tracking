import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const SPANISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// CREATE BOARD
	[ILanguageAdapterKey.CREATE_BOARD_MODAL_TITLE]: "Crear",
	[ILanguageAdapterKey.CREATE_BOARD_SUBMIT_FORM]: "Crear",

	// DELETE BOARD
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE]: "Borrar",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_CONFIRMATION]:
		"¿Seguro que desea eliminar este tablero?",
	[ILanguageAdapterKey.DELETE_BOARD_CONFIRM_BUTTON_LABEL]: "Borrar",
	[ILanguageAdapterKey.DELETE_BOARD_CANCEL_BUTTON_LABEL]: "Cancelar",

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
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_TITLE]:
		"No se encontraron cartones",
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_DESCRIPTION]:
		"Actualmente no hay cartones disponibles",

	[ILanguageAdapterKey.GAME_BY_ID_CREATE_BUTTON_LABEL]: "Crear",
	[ILanguageAdapterKey.GAME_BY_ID_DELETE_BUTTON_TOOLTIP]: "Borrar",
	[ILanguageAdapterKey.GAME_BY_ID_UPDATE_BUTTON_TOOLTIP]: "Editar",

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

	// MANAGE GAME
	[ILanguageAdapterKey.MANAGE_GAME_NAME_FIELD_LABEL]: "Nombre",
	[ILanguageAdapterKey.MANAGE_GAME_GRID_FIELD_LABEL]: "Cartón",

	// QUERY_ERROR
	[ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE]: "Se produjo un error.",
	[ILanguageAdapterKey.QUERY_ERROR_RETRY_LABEL]: "Reintentar",

	// READ FROM FILE
	[ILanguageAdapterKey.READ_FROM_FILE_MUTATION_ERROR_MSG]:
		"Error al leer la imagen",

	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_TITLE]:
		"Leer tablero a partir de una imagen",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_DESCRIPTION]:
		"Sube una imagen y el tablero se detectará automáticamente para su revisión.",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_INPUT_PLACEHOLDER]:
		"Seleccionar imagen",

	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TITLE]:
		"Confirmar tablero detectado",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_DESCRIPTION]:
		"Revisa la cuadrícula extraída antes de aplicar los cambios.",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TRY_AGAIN_BUTTON_LABEL]:
		"Intentar de nuevo",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_ACCEPT_BUTTON_LABEL]:
		"Aceptar tablero",

	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_TITLE]:
		"Detectando tablero",
	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_DESCRIPTION]:
		"Analizando la imagen y extrayendo la estructura de la cuadrícula…",

	// SCREEN: GAME BY ID
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_GAMES]: "Juegos",
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_DETAILS]: "Detalles",

	// UPDATE BOARD
	[ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE]: "Editar",
	[ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM]: "Guardar",
	[ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG]:
		"No se pudo obtener la información del tablero",
};
