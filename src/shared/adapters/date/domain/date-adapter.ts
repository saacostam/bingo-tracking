export interface IDateAdapter {
	format(input: IDateAdapterPayload["FormatArgs"]): string;
}

export interface IDateAdapterPayload {
	FormatArgs: { type: "utc-ms"; value: number };
}
