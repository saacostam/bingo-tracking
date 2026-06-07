export enum QueryKeys {
	// BOARDS
	GET_BOARD_BY_ID = "Get Board by Id",

	// GAMES
	GET_GAME_BY_ID = "Get Game by Id",
	GET_GAMES = "Get Games",

	QUERY_TODOS = "Query Todos",

	// PLAYS
	GET_PLAYS_BY_GAME_ID = "Get Plays by Game Id",
}

export enum MutationKeys {
	// BOARD
	CREATE_BOARD = "Create Board",
	DELETE_BOARD = "Delete Board",
	READ_BOARD_FROM_FILE = "Read Board Form File",
	UPDATE_BOARD = "Update Board",

	// TODO
	CREATE_TODO = "Create Todo",
	DELETE_TODO = "Delete Todo",
	PATCH_TODO = "Patch Todo",

	// LOGIN
	LOGIN = "Login",
}
