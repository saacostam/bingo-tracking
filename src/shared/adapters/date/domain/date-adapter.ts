export interface IDateAdapter {
	formatDate(input: IDateAdapterArgs["FormatDate"]["In"]): string;
}

export interface IDateAdapterArgs {
	FormatDate: {
		In: { type: "utc-ms"; value: number };
	};
}
