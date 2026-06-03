import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const ENGLISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// CREATE GAME
	[ILanguageAdapterKey.CREATE_GAME_MODAL_TITLE]: "Create",
	[ILanguageAdapterKey.CREATE_GAME_SUBMIT_FORM]: "Create",

	// DELETE BOARD
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE]: "Delete",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_CONFIRMATION]:
		"Are you sure you want to delete this board?",
	[ILanguageAdapterKey.DELETE_BOARD_CONFIRM_BUTTON_LABEL]: "Delete",
	[ILanguageAdapterKey.DELETE_BOARD_CANCEL_BUTTON_LABEL]: "Cancel",

	// GAMES
	[ILanguageAdapterKey.GAMES_HEADER]: "Games",
	[ILanguageAdapterKey.GAMES_QUERY_GAMES_ERROR_MSG]:
		"Unable to retrieve game information.",
	[ILanguageAdapterKey.GAMES_NO_GAMES_TITLE]: "No Games Found",
	[ILanguageAdapterKey.GAMES_NO_GAMES_DESCRIPTION]:
		"There are currently no games available.",

	// GAME BY ID
	[ILanguageAdapterKey.GAME_BY_ID_BOARDS_HEADER]: "Boards",
	[ILanguageAdapterKey.GAME_BY_ID_BOARDS_DESCRIPTION]:
		"The boards created for this game",
	[ILanguageAdapterKey.GAME_BY_ID_QUERY_GAME_ERROR_MSG]:
		"Unable to retrieve game information",
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_TITLE]: "No Boards Found",
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_DESCRIPTION]:
		"There are currently no boards available",

	[ILanguageAdapterKey.GAME_BY_ID_CREATE_BUTTON_LABEL]: "Create",
	[ILanguageAdapterKey.GAME_BY_ID_DELETE_BUTTON_TOOLTIP]: "Delete",
	[ILanguageAdapterKey.GAME_BY_ID_UPDATE_BUTTON_TOOLTIP]: "Edit",

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

	// MANAGE GAME
	[ILanguageAdapterKey.MANAGE_GAME_NAME_FIELD_LABEL]: "Name",
	[ILanguageAdapterKey.MANAGE_GAME_GRID_FIELD_LABEL]: "Grid",

	// QUERY_ERROR
	[ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE]: "Something went wrong!",
	[ILanguageAdapterKey.QUERY_ERROR_RETRY_LABEL]: "Retry",

	// SCREEN: GAME BY ID
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_GAMES]: "Games",
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_DETAILS]: "Details",

	// UPDATE BOARD
	[ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE]: "Edit",
	[ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM]: "Save",
	[ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG]:
		"Unable to retrieve board information",
};
