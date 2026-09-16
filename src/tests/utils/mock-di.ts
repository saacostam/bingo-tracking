import type { Mock } from "vitest";
import type { IAdapters } from "@/shared/adapters/core/domain";
import {
	type ILanguageAdapterKey,
	ILanguageAdapterLanguage,
} from "@/shared/adapters/language/domain";
import { ENGLISH_KEY_VALUE_PAIRS } from "@/shared/adapters/language/infra";
import type { ISession } from "@/shared/adapters/session/domain";
import { IThemeVariant } from "@/shared/adapters/theme/domain";
import type { IClients } from "@/shared/clients/domain";

export function mockDi(overrides?: {
	adapters?: {
		sessionAdapter?: {
			session?: ISession;
		};
	};
}): Mocked<IDepsInjection> {
	return {
		clients: {
			board: {
				create: vi.fn(),
				delete: vi.fn(),
				getById: vi.fn(),
				readFromFile: vi.fn(),
				update: vi.fn(),
			},
			game: {
				createGame: vi.fn(),
				deleteGame: vi.fn(),
				getGames: vi.fn(),
				getGameById: vi.fn(),
				setBoardTemplate: vi.fn(),
			},
			loginClient: {
				login: vi.fn(),
			},
			play: {
				create: vi.fn(),
				getAllByGameId: vi.fn(),
				getById: vi.fn(),
				takeNumber: vi.fn(),
				updatePatterns: vi.fn(),
			},
		},
		adapters: {
			analyticsAdapter: {
				trackEvent: vi.fn(),
			},
			date: {
				formatDate: vi.fn(),
				formatDateTime: vi.fn(),
			},
			errorMonitoringAdapter: {
				report: vi.fn(),
			},
			fetcherAdapter: {
				get: vi.fn(),
				post: vi.fn(),
				put: vi.fn(),
				patch: vi.fn(),
				delete: vi.fn(),
			},
			lang: {
				// We default to english, but the consumer can override
				language: ILanguageAdapterLanguage.ENGLISH,
				setLanguage: vi.fn(),
				get: ((key: ILanguageAdapterKey) =>
					ENGLISH_KEY_VALUE_PAIRS[key]) as Mocked<IAdapters>["lang"]["get"],
			},
			persistenceAdapter: {
				get: vi.fn(),
				set: vi.fn(),
				unsafeGet: vi.fn(),
			},
			notificationAdapter: {
				notify: vi.fn(),
			},
			sessionAdapter: {
				session: overrides?.adapters?.sessionAdapter?.session ?? {
					type: "authenticated",
					token: "token",
				},
				removeToken: vi.fn(),
				setToken: vi.fn(),
			},
			themeAdapter: {
				theme: IThemeVariant.LIGHT,
				setTheme: vi.fn(),
			},
			uuidAdapter: {
				gen: vi.fn(),
			},
		},
	} satisfies Mocked<IDepsInjection>;
}

type Mocked<T> = {
	[K in keyof T]: T[K] extends (...args: infer A) => infer R
		? Mock<(...args: A) => R>
		: T[K] extends object
			? Mocked<T[K]>
			: T[K];
};

export interface IDepsInjection {
	adapters: IAdapters;
	clients: IClients;
}
