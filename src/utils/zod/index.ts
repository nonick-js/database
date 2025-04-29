export const domainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;

export function isUniqueArray(items: unknown[]) {
  return items.length === new Set(items).size;
}

export function validateObject<T extends Record<string, unknown>>(obj: unknown): T | undefined {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return undefined;
  }
  return Object.keys(obj).length > 0 ? (obj as T) : undefined;
}
