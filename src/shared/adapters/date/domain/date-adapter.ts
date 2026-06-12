export interface IDateAdapter {
	/**
	 * Formats a UTC timestamp into a human-readable date string.
	 *
	 * Intended for displaying calendar dates without time information.
	 */
	formatDate(input: IDateAdapterArgs["FormatDate"]["In"]): string;

	/**
	 * Formats a UTC timestamp into a human-readable date and time string.
	 *
	 * Intended for displaying both the calendar date and time information
	 * in a single value.
	 */
	formatDateTime(input: IDateAdapterArgs["FormatDateTime"]["In"]): string;
}

export interface IDateAdapterArgs {
	FormatDate: {
		In: { type: "utc-ms"; value: number };
	};
	FormatDateTime: {
		In: { type: "utc-ms"; value: number };
	};
}
