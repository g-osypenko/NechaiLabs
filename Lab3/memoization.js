// memoize.js

class LRUCache {
    constructor(limit = Infinity) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value); // set as most recently used
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.limit) {
            // remove least recently used
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

class LFUCache {
    constructor(limit = Infinity) {
        this.cache = new Map();
        this.freqMap = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;
        this.freqMap.set(key, (this.freqMap.get(key) || 0) + 1);
        return this.cache.get(key);
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.set(key, value);
            this.freqMap.set(key, (this.freqMap.get(key) || 0) + 1);
        } else {
            if (this.cache.size >= this.limit) {
                // find least frequently used
                let minFreq = Infinity;
                let keyToDelete;
                for (const [k, freq] of this.freqMap.entries()) {
                    if (freq < minFreq) {
                        minFreq = freq;
                        keyToDelete = k;
                    }
                }
                this.cache.delete(keyToDelete);
                this.freqMap.delete(keyToDelete);
            }
            this.cache.set(key, value);
            this.freqMap.set(key, 1);
        }
    }
}

class TimeCache {
    constructor(ttl = 5000) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return undefined;
        const now = Date.now();
        if (now - entry.time > this.ttl) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.value;
    }

    set(key, value) {
        this.cache.set(key, { value, time: Date.now() });
    }
}

function memoize(fn, options = {}) {
    const {
        maxSize = Infinity,
        strategy = 'LRU',
        ttl = 5000,
        customPolicy = null
    } = options;

    let cache;

    if (customPolicy) {
        cache = customPolicy;
    } else if (strategy === 'LRU') {
        cache = new LRUCache(maxSize);
    } else if (strategy === 'LFU') {
        cache = new LFUCache(maxSize);
    } else if (strategy === 'TIME') {
        cache = new TimeCache(ttl);
    } else {
        throw new Error("Unknown cache strategy");
    }

    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

export { memoize, LRUCache, LFUCache, TimeCache };
