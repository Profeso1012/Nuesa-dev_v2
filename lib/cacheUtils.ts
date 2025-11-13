/**
 * Simple client-side caching utility with 1-hour TTL
 * Used for reducing API calls and improving performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const getCachedData = <T,>(key: string): T | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);

    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error reading cache:', err);
    return null;
  }
};

export const setCachedData = <T,>(key: string, data: T): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const cacheEntry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export const clearCache = (key: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error clearing cache:', err);
  }
};

export const useCachedFetch = async <T,>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> => {
  const cached = getCachedData<T>(key);
  if (cached) {
    return cached;
  }

  const data = await fetchFn();
  setCachedData(key, data);
  return data;
};
