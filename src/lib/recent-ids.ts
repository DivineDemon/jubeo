export const RECENT_IDS_COOKIE = "jubeo_recent_result_ids";

export function getRecentIds(cookieValue: string | undefined): string[] {
  if (!cookieValue) return [];
  try {
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded) as unknown;
    if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}
