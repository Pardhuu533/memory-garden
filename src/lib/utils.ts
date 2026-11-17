/**
 * Utility function to conditionally combine class names cleanly
 */
export function cn(...inputs: (string | boolean | undefined | null | Record<string, boolean | undefined | null>)[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}

/**
 * Formats a Date into a gentle, literary date string
 * Example: "Monday, 14 September"
 */
export function formatLiteraryDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a Date with year
 * Example: "September 14, 2026"
 */
export function formatFullDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
