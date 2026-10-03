import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";

export const ENGLISH_KEY_VALUE_PAIRS: Record<ILanguageAdapterKey, string> = {
	// BOARD EDITOR FLOW
	[ILanguageAdapterKey.BOARD_EDITOR_FLOW_MANUAL_TAB_LABEL]: "Manual",
	[ILanguageAdapterKey.BOARD_EDITOR_FLOW_IMAGE_TAB_LABEL]: "Image",

	// CREATE BOARD
	[ILanguageAdapterKey.CREATE_BOARD_MODAL_TITLE]: "Create",
	[ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_ERROR]:
		"Unable to create board.",
	[ILanguageAdapterKey.CREATE_BOARD_NOTIFICATION_SUCCESS]:
		"Board created successfully.",
	[ILanguageAdapterKey.CREATE_BOARD_SUBMIT_FORM]: "Create",

	// CREATE GAME
	[ILanguageAdapterKey.CREATE_GAME_BUTTON_LABEL]: "Create",
	[ILanguageAdapterKey.CREATE_GAME_MODAL_TITLE]: "Create Game",
	[ILanguageAdapterKey.CREATE_GAME_MODAL_SUBMIT]: "Create",
	[ILanguageAdapterKey.CREATE_GAME_NAME_FIELD_LABEL]: "Name",
	[ILanguageAdapterKey.CREATE_GAME_NOTIFICATION_ERROR]: "Unable to create game",
	[ILanguageAdapterKey.CREATE_GAME_NOTIFICATION_SUCCESS]: "Game created",

	// CREATE PLAY
	[ILanguageAdapterKey.CREATE_PLAY_MODAL_TITLE]: "Start",
	[ILanguageAdapterKey.CREATE_PLAY_NOTIFICATION_ERROR]: "Unable to start play.",
	[ILanguageAdapterKey.CREATE_PLAY_NOTIFICATION_SUCCESS]:
		"Play started successfully.",
	[ILanguageAdapterKey.CREATE_PLAY_SUBMIT_FORM]: "Start",

	// DELETE BOARD
	[ILanguageAdapterKey.DELETE_BOARD_CANCEL_BUTTON_LABEL]: "Cancel",
	[ILanguageAdapterKey.DELETE_BOARD_CONFIRM_BUTTON_LABEL]: "Delete",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_CONFIRMATION]:
		"Are you sure you want to delete this board?",
	[ILanguageAdapterKey.DELETE_BOARD_MODAL_TITLE]: "Delete",
	[ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_ERROR]:
		"Unable to delete board.",
	[ILanguageAdapterKey.DELETE_BOARD_NOTIFICATION_SUCCESS]:
		"Board deleted successfully.",

	// DELETE GAME
	[ILanguageAdapterKey.DELETE_GAME_CANCEL_BUTTON_LABEL]: "Cancel",
	[ILanguageAdapterKey.DELETE_GAME_CONFIRM_BUTTON_LABEL]: "Delete",
	[ILanguageAdapterKey.DELETE_GAME_MODAL_CONFIRMATION]:
		"Are you sure you want to delete this game?",
	[ILanguageAdapterKey.DELETE_GAME_MODAL_TITLE]: "Delete Game",
	[ILanguageAdapterKey.DELETE_GAME_NOTIFICATION_ERROR]: "Unable to delete game",
	[ILanguageAdapterKey.DELETE_GAME_NOTIFICATION_SUCCESS]: "Game deleted",

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
		"Boards created for this game",
	[ILanguageAdapterKey.GAME_BY_ID_QUERY_GAME_ERROR_MSG]:
		"Unable to retrieve game information",
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_TITLE]: "No Boards Found",
	[ILanguageAdapterKey.GAME_BY_ID_NO_BOARDS_DESCRIPTION]:
		"There are currently no boards available",

	[ILanguageAdapterKey.GAME_BY_ID_CREATE_BOARD_BUTTON_LABEL]: "Create",
	[ILanguageAdapterKey.GAME_BY_ID_UPDATE_LAYOUT_BUTTON_LABEL]: "Layout",
	[ILanguageAdapterKey.GAME_BY_ID_CREATE_PLAY_BUTTON_lABEL]: "Start Play",
	[ILanguageAdapterKey.GAME_BY_ID_DELETE_BOARD_BUTTON_TOOLTIP]: "Delete",
	[ILanguageAdapterKey.GAME_BY_ID_UPDATE_BOARD_BUTTON_TOOLTIP]: "Edit",

	// GENERIC
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_CREATED_TITLE]: "Created",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_DELETED_TITLE]: "Deleted",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_ERROR_TITLE]: "Error",
	[ILanguageAdapterKey.GENERIC_NOTIFICATION_UPDATED_TITLE]: "Updated",

	// LANGUAGE
	[ILanguageAdapterKey.LANGUAGE_MENU_HEADER]: "Available Languages",

	// LOGIN
	[ILanguageAdapterKey.LOGIN_HEADER]: "Login",
	[ILanguageAdapterKey.LOGIN_DESCRIPTION]: "🎯 Sign in. Play. Enjoy the game.",
	[ILanguageAdapterKey.LOGIN_USERNAME_FIELD_LABEL]: "Username",
	[ILanguageAdapterKey.LOGIN_PASSWORD_FIELD_LABEL]: "Password",
	[ILanguageAdapterKey.LOGIN_SUBMIT_CTA]: "Login",

	// LOGOUT
	[ILanguageAdapterKey.LOGOUT_BUTTON_CTA]: "Logout",

	// MANAGE GAME
	[ILanguageAdapterKey.MANAGE_GAME_NAME_FIELD_LABEL]: "Name",
	[ILanguageAdapterKey.MANAGE_GAME_GRID_FIELD_LABEL]: "Grid",

	// MANAGE PLAY
	[ILanguageAdapterKey.MANAGE_PLAY_NAME_FIELD_LABEL]: "Name",

	// PLAYS LIST
	[ILanguageAdapterKey.PLAYS_LIST_HEADER]: "Plays",
	[ILanguageAdapterKey.PLAYS_LIST_DESCRIPTION]:
		"Browse all plays for this game.",
	[ILanguageAdapterKey.PLAYS_LIST_QUERY_PLAYS_ERROR_MSG]:
		"Unable to retrieve play information.",
	[ILanguageAdapterKey.PLAYS_LIST_NO_PLAYS_TITLE]: "No Plays Found",
	[ILanguageAdapterKey.PLAYS_LIST_NO_PLAYS_DESCRIPTION]:
		"There are currently no plays available.",

	// QUERY_ERROR
	[ILanguageAdapterKey.QUERY_ERROR_DEFAULT_TITLE]: "Something went wrong!",
	[ILanguageAdapterKey.QUERY_ERROR_RETRY_LABEL]: "Retry",

	// READ FROM FILE
	[ILanguageAdapterKey.READ_FROM_FILE_MUTATION_ERROR_MSG]:
		"Unable to read image",

	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_TITLE]:
		"Import board from image",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_DESCRIPTION]:
		"Upload an image and the board will be detected automatically for review.",
	[ILanguageAdapterKey.READ_FROM_FILE_EMPTY_STATE_INPUT_PLACEHOLDER]:
		"Select image",

	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TITLE]: "Confirm detected board",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_DESCRIPTION]:
		"Review the extracted grid before applying changes.",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_TRY_AGAIN_BUTTON_LABEL]:
		"Try again",
	[ILanguageAdapterKey.READ_FROM_FILE_CONTENT_ACCEPT_BUTTON_LABEL]:
		"Apply board",

	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_TITLE]: "Detecting board",
	[ILanguageAdapterKey.READ_FROM_FILE_LOADING_STATE_DESCRIPTION]:
		"Analyzing image and reconstructing board layout…",

	// SCREEN: GAME BY ID
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_GAMES]: "Games",
	[ILanguageAdapterKey.SCREEN_GAME_BY_ID_BREADCRUMBS_DETAILS]: "Details",

	// UPDATE BOARD
	[ILanguageAdapterKey.UPDATE_BOARD_MODAL_TITLE]: "Update",
	[ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_ERROR]:
		"Unable to update board.",
	[ILanguageAdapterKey.UPDATE_BOARD_NOTIFICATION_SUCCESS]:
		"Board updated successfully.",
	[ILanguageAdapterKey.UPDATE_BOARD_QUERY_BOARD_ERROR_MSG]:
		"Unable to retrieve board information",
	[ILanguageAdapterKey.UPDATE_BOARD_SUBMIT_FORM]: "Save",

	// UPDATE GAME LAYOUT
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_MODAL_TITLE]: "Update Layout",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_QUERY_BOARD_ERROR_MSG]:
		"Unable to retrieve game information.",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_DESCRIPTION]:
		"Match the layout to the dimensions and mark available and blocked slots.",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_AVAILABLE_LABEL]: "Available",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_BLOCKED_LABEL]: "Blocked",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_CANCEL_BTN_LABEL]: "Close",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_SUBMIT_BTN_LABEL]: "Save",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_NOTIFICATION_ERROR]:
		"Unable to update board layout.",
	[ILanguageAdapterKey.UPDATE_GAME_LAYOUT_NOTIFICATION_SUCCESS]:
		"Board layout updated successfully.",
};
