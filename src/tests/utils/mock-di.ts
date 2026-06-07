import type { IAdapters } from "@/shared/adapters/core/domain";
import { ILanguageAdapterLanguage } from "@/shared/adapters/language/domain";
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
}) {
	const clients = {
		board: {
			create: vi.fn(),
			delete: vi.fn(),
			getById: vi.fn(),
			readFromFile: vi.fn(),
			update: vi.fn(),
		},
		game: {
			getGames: vi.fn(),
			getGameById: vi.fn(),
		},
		loginClient: {
			login: vi.fn(),
		},
		play: {
			create: vi.fn(),
			getByGameId: vi.fn(),
		},
		todoClient: {
			createTodo: vi.fn(),
			deleteTodo: vi.fn(),
			patchTodo: vi.fn(),
			queryTodos: vi.fn(),
		},
	} satisfies IClients;

	const adapters = {
		analyticsAdapter: {
			trackEvent: vi.fn(),
		},
		date: {
			format: vi.fn(),
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
			get: (key) => ENGLISH_KEY_VALUE_PAIRS[key],
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
	} satisfies IAdapters;

	return {
		clients,
		adapters,
	};
}
