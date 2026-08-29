import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const manageBoardSchema = z.object({
	name: z.string().min(1, "Required"),
	values: z.array(z.coerce.number<number>()),
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
