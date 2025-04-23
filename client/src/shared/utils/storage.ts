export function getFromStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}
