type CacheEntry<T> = {
	createdAt: number; // Date.now()
	val: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalID: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop();
	}

	add<T>(key: string, val: T) {
		const entry: CacheEntry<T> = {
			createdAt: Date.now(),
			val: val,
		};
		this.#cache.set(key, entry);
	}

	get<T>(key: string): T | undefined {
		return this.#cache.get(key)?.val as T | undefined;
	}

	#reap() {
		console.log("reaping...");
		const limit = Date.now() - this.#interval;
		for (const [key, entry] of this.#cache.entries()) {
			if (entry.createdAt < limit) {
				this.#cache.delete(key);
			}
		}
	}

	#startReapLoop() {
		this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
	}

	stopReapLoop() {
		if (this.#reapIntervalID) {
			clearInterval(this.#reapIntervalID);
			this.#reapIntervalID = undefined;
		}
	}
}
