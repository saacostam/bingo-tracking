export enum QueryKeys {
	// BOARDS
	GET_BOARD_BY_ID = "Get Board by Id",

	// GAMES
	GET_GAME_BY_ID = "Get Game by Id",
	GET_GAMES = "Get Games",

	// PLAYS
	GET_PLAY_BY_ID = "Get Play by Id",
	GET_PLAYS_BY_GAME_ID = "Get Plays by Game Id",
}

export enum MutationKeys {
	// BOARD
	CREATE_BOARD = "Create Board",
	DELETE_BOARD = "Delete Board",
	READ_BOARD_FROM_FILE = "Read Board Form File",
	UPDATE_BOARD = "Update Board",

	// GAMES
	CREATE_GAME = "Create Game",
	DELETE_GAME = "Delete Game",
	SET_BOARD_TEMPLATE = "Set Board Template",

	// PLAYS
	CREATE_PLAY = "Create Play",
	TAKE_NUMBER = "Take Number",
	UPDATE_PATTERNS = "Update Patterns",

	// LOGIN
	LOGIN = "Login",
}
