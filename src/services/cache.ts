type CacheEntry = {
    data: any;
    cachedAt: number;
    expiry: number;
  };

  const cache: Record<string, CacheEntry> = {};

  const set = (key: string, data: any, expiry: number = 15 * 60 * 1000): void => {
    cleanup()
    cache[key] = {
      data,
      cachedAt: Date.now(),
      expiry
    };
  };

  const get = (key: string): Promise<any | null> => {
    return new Promise((resolve) => {
      const entry = cache[key];
      if (entry && entry.cachedAt + entry.expiry > Date.now()) {
        resolve(entry.data);
      } else {
        resolve(null);
      }
    });
  };

  const cleanup = () => {
    const now = Date.now();
    for (const key in cache) {
      if (cache[key].cachedAt + cache[key].expiry <= now) {
        delete cache[key];
      }
    }
  };

  const cacheService = {
    set,
    get,
  };

  export default cacheService;
