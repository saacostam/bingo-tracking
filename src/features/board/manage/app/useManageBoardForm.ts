import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const boardCellSchema = z.coerce.number<number>();

const boardRowSchema = z.tuple([
	boardCellSchema,
	boardCellSchema,
	boardCellSchema,
	boardCellSchema,
	boardCellSchema,
]);

const boardCenterRowSchema = z.tuple([
	boardCellSchema,
	boardCellSchema,
	boardCellSchema,
	boardCellSchema,
]);

export const manageBoardSchema = z.object({
	name: z.string().min(1, "Required"),
	grid: z.tuple([
		boardRowSchema,
		boardRowSchema,
		boardCenterRowSchema,
		boardRowSchema,
		boardRowSchema,
	]),
});

export type IManageBoardForm = z.infer<typeof manageBoardSchema>;

export interface UseManageBoardFormArgs {
	defaultValues: IManageBoardForm;
}

export function useManageBoardForm({ defaultValues }: UseManageBoardFormArgs) {
	return useForm({
		defaultValues,
		resolver: zodResolver(manageBoardSchema),
	});
}
