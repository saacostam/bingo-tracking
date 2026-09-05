import { PlayBoardList } from "@/features/play/board-list/ui";
import { PlayDetailsHeader } from "@/features/play/details-header/ui";
import { PlayNumbers } from "@/features/play/numbers/ui";
import { PatternsList } from "@/features/play/patterns-list/ui";
import {
	type IPatternSlots,
	type IPlaySlots,
	PlayByIdComposer,
} from "./PlayByIdComposer";

const Mock = () => null;

const patternsSlots: IPatternSlots = {
	List: PatternsList,
	Update: Mock,
};

const playSlots: IPlaySlots = {
	BoardList: PlayBoardList,
	DetailsHeader: PlayDetailsHeader,
	Numbers: PlayNumbers,
};

export interface PlayByIdProps {
	playId: string;
}

export function PlayById({ playId }: PlayByIdProps) {
	return (
		<PlayByIdComposer
			patternSlots={patternsSlots}
			playId={playId}
			playSlots={playSlots}
		/>
	);
}
