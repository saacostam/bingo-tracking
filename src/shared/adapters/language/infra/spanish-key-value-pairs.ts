import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const SPANISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// BOARD EDITOR FLOW
	[ILanguageAdapterKey.BOARD_EDITOR_FLOW_MANUAL_TAB_LABEL]: "Manual",
	[ILanguageAdapterKey.BOARD_EDITOR_FLOW_IMAGE_TAB_LABEL]: "Imagen",

	// CREATE BOARD
	[ILanguageAdapterKey.CREATE_BOARD_MODAL_TITLE]: "Crear",
	[ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_ERROR]:
		"No se pudo crear el cartón.",
	[ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_SUCCESS]:
		"Cartón creado correctamente.",
	[ILanguageAdapterKey.CREATE_BOARD_SUBMIT_FORM]: "Crear",

	// DELETE BOARD
	[ILanguageAdapterKey.DELETE_BOARD_CANCEL_BUTTON_LABEL]: "Cancelar",
	[ILanguageAdapterKey.DELETE_BOARD_CONFIRM_BUTTON_LABEL]: "Eliminar",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_CONFIRMATION]:
		"¿Seguro que desea eliminar este cartón?",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE]: "Eliminar",
	[ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_ERROR]:
		"No se pudo eliminar el cartón.",
	[ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_SUCCESS]:
		"Cartón eliminado correctamente.",

	// GAMES
	[ILanguageAdapterKey.GAMES_HEADER]: "Juegos",
	[ILanguageAdapterKey.GAMES_QUERY_GAMES_ERROR_MSG]:
		"No se pudo cargar la información de los juegos.",
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
	[ILanguageAdapterKey.GAME_BY_ID_DELETE_BUTTON_TOOLTIP]: "Eliminar",
	[ILanguageAdapterKey.GAME_BY_ID_UPDATE_BUTTON_TOOLTIP]: "Editar",

	// GENERIC
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_CREATED_TITLE]: "Creado",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_DELETED_TITLE]: "Eliminado",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE]: "Error",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_UPDATED_TITLE]: "Actualizado",

	// LANGUAGE
	[ILanguageAdapterKey.LANGUAGE_MENU_HEADER]: "Idiomas disponibles",

	// LOGIN
	[ILanguageAdapterKey.LOGIN_HEADER]: "Iniciar sesión",
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
		"Importar cartón desde una imagen",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_DESCRIPTION]:
		"Sube una imagen y el cartón se detectará automáticamente para su revisión.",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_INPUT_PLACEHOLDER]:
		"Seleccionar imagen",

	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TITLE]:
		"Confirmar cartón detectado",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_DESCRIPTION]:
		"Revisa el cartón extraído antes de aplicar los cambios.",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TRY_AGAIN_BUTTON_LABEL]:
		"Reintentar",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_ACCEPT_BUTTON_LABEL]:
		"Aceptar cartón",

	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_TITLE]: "Detectando cartón",
	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_DESCRIPTION]:
		"Analizando la imagen y detectando la estructura del cartón…",

	// SCREEN: GAME BY ID
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_GAMES]: "Juegos",
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_DETAILS]: "Detalles",

	// UPDATE BOARD
	[ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE]: "Editar",
	[ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_ERROR]:
		"No se pudo actualizar el cartón.",
	[ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_SUCCESS]:
		"Cartón actualizado correctamente.",
	[ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG]:
		"No se pudo obtener la información del cartón",
	[ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM]: "Guardar",
};
