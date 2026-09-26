import { Tabs, Tooltip } from "@mantine/core";
import { useCallback, useState } from "react";
import type { IBoard, IBoardTemplate } from "@/features/board/core/domain";
import type {
	IManageBoardForm,
	useManageBoardForm,
} from "@/features/board/manage/app";
import { ManageBoard } from "@/features/board/manage/ui";
import { ReadFromFile } from "@/features/board/read-from-file/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ILanguageAdapterKey } from "@/shared/adapters/language/domain";
import { Disabled } from "@/shared/components";

export interface BoardEditorFlowProps {
	action: string;
	boardTemplate: IBoardTemplate;
	canUseImageFlow: boolean;
	form: ReturnType<typeof useManageBoardForm>;
	isPending: boolean;
	onSubmit: (data: IManageBoardForm) => void;
}

type BoardEditorFlowTab = "manual" | "read";

export function BoardEditorFlow({
	action,
	boardTemplate,
	canUseImageFlow,
	form,
	isPending,
	onSubmit,
}: BoardEditorFlowProps) {
	const { lang } = useAdapters();

	const [tab, setTab] = useState<BoardEditorFlowTab>("manual");

	const onUpdateValues = useCallback(
		(values: IBoard["values"]) => {
			form.setValue("values", values);
			setTab("manual");
		},
		[form.setValue],
	);

	return (
		<Tabs onChange={(tab) => setTab(tab as BoardEditorFlowTab)} value={tab}>
			<Tabs.List>
				<Tabs.Tab value="manual">
					{lang.get(ILanguageAdapterKey.BOARD_EDITOR_FLOW_MANUAL_TAB_LABEL)}
				</Tabs.Tab>
				<Tooltip
					label="Reading a board from an image is not available for your account."
					disabled={canUseImageFlow}
				>
					<span>
						<Tabs.Tab disabled={!canUseImageFlow} value="read">
							{lang.get(ILanguageAdapterKey.BOARD_EDITOR_FLOW_IMAGE_TAB_LABEL)}
						</Tabs.Tab>
					</span>
				</Tooltip>
			</Tabs.List>

			<Tabs.Panel pt="md" value="manual">
				<ManageBoard
					action={action}
					boardTemplate={boardTemplate}
					form={form}
					isPending={isPending}
					onSubmit={onSubmit}
				/>
			</Tabs.Panel>

			<Tabs.Panel pt="md" value="read">
				{canUseImageFlow ? (
					<ReadFromFile
						boardTemplate={boardTemplate}
						onUpdateValues={onUpdateValues}
					/>
				) : (
					<Disabled
						msg="Reading a board from an image is not available for your account."
						where={`BoardEditorFlow.ReadFromFile.${action}.not-enabled`}
					/>
				)}
			</Tabs.Panel>
		</Tabs>
	);
}
