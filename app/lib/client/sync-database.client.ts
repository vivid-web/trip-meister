import type { Table } from "dexie";

export type Syncable<T extends object> = T & {
	$created?: Date;
	$deleted?: 0 | 1;
	$synced?: 0 | 1;
	$updated?: Date;
};

type Config = {
	onPull?: () => Promise<void> | void;
	onPush?: () => Promise<void> | void;
};

export const createSync = () => {
	const add = <T extends Syncable<object>>(
		table: Table<T>,
		options: Config = {},
	) => {
		const sync = async () => {
			if (typeof window === "undefined") {
				return;
			}

			if (!window.navigator.onLine) {
				return;
			}

			if (options.onPull) {
				await options.onPull();
			}

			if (options.onPush) {
				await options.onPush();
			}
		};

		table.hook("creating", (primKey, obj) => {
			obj.$created = obj.$created ?? new Date();
			obj.$updated = obj.$updated ?? new Date();
			obj.$deleted = obj.$deleted ?? 0;
			obj.$synced = obj.$synced ?? 0;
		});

		table.hook("updating", (updates, id, doc) => {
			console.log(updates, id, doc);

			console.log("updating");
		});

		table.hook("deleting", async (primKey, obj) => {
			if (obj.$deleted) {
				return;
			}

			await table.add({
				...obj,
				$deleted: 1,
				$synced: 0,
				$updated: new Date(),
			});
		});

		void sync();
	};

	return { add };
};
