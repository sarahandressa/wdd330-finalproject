const NS = 'bcb:';

export const storage = {
  write(key, value) {
    localStorage.setItem(NS + key, JSON.stringify(value));
  },
  read(key, defaultValue = null) {
    const raw = localStorage.getItem(NS + key);
    try {
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  remove(key) {
    localStorage.removeItem(NS + key);
  },
  clearAll() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(NS))
      .forEach((k) => localStorage.removeItem(k));
  },
};
