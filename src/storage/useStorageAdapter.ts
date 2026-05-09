import { useCallback, useMemo } from "react";

/**
 * Defines the valid keys that can be used with the persistence adapter.
 */
export enum IStorageAdapterKey {
	BINGO_CARDS = "bingo-cards",
}

/**
 * Interface representing a persistence adapter.
 */
export interface IStorageAdapter {
	/**
	 * Retrieves the value associated with the provided key from the persistent storage.
	 * If the key does not exist, it returns `null`.
	 *
	 * @param {IStorageAdapterKey} key - The key to retrieve the value for.
	 * @returns {unknown | null} The value associated with the key, or `null` if not found.
	 */
	get(key: IStorageAdapterKey): unknown | null;

	/**
	 * Stores a value in persistent storage under the provided key.
	 *
	 * @param {IStorageAdapterKey} key - The key to store the value under.
	 * @param {unknown} value - The value to store.
	 * @returns {void} This method does not return a value.
	 */
	set(key: IStorageAdapterKey, value: unknown): void;

	/**
	 * Retrieves the value associated with the provided key from the persistent storage
	 * and casts it to the specified type `T`.
	 * This method should be used when the type of the value is known and needs to be explicitly typed.
	 * If the key does not exist, it returns `null`.
	 *
	 * @template T
	 * @param {IStorageAdapterKey} key - The key to retrieve the value for.
	 * @returns {T | null} The value associated with the key, or `null` if not found.
	 */
	unsafeGet<T>(key: IStorageAdapterKey): T | null;
}

export function useStorageAdapter(): IStorageAdapter {
	const get: IStorageAdapter["get"] = useCallback((key) => {
		try {
			const rawValueString = localStorage.getItem(key);
			if (rawValueString === null) return null;

			return JSON.parse(rawValueString) as unknown;
		} catch {
			return null;
		}
	}, []);

	const set: IStorageAdapter["set"] = useCallback((key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	}, []);

	const unsafeGet: IStorageAdapter["unsafeGet"] = useCallback(
		<T>(key: IStorageAdapterKey) => {
			try {
				const rawValueString = localStorage.getItem(key);
				if (rawValueString === null) return null;

				return JSON.parse(rawValueString) as T;
			} catch {
				return null;
			}
		},
		[],
	);

	return useMemo(
		() => ({
			get,
			set,
			unsafeGet,
		}),
		[get, set, unsafeGet],
	);
}
