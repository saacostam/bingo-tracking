export function computeCompletionPercentage(args: {
	boardNumbers: number[];
	takenNumbers: number[];
}) {
	const { boardNumbers, takenNumbers } = args;

	const numerator = boardNumbers.filter((n) => takenNumbers.includes(n)).length;
	const denominator = boardNumbers.length;

	const frac = (numerator / denominator) * 100;
	const val = Math.max(0, Math.min(frac, 100));

	return Number(val.toFixed(2));
}
