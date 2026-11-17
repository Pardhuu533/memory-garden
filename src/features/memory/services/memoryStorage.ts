import { MemoryEntry } from "../types";

const STORAGE_KEY = "memory_garden_entries_v1";

/**
 * Clean local-first repository for memories
 */
export const memoryRepository = {
  getAll(): MemoryEntry[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as MemoryEntry[];
    } catch {
      return [];
    }
  },

  saveAll(entries: MemoryEntry[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Could not save memories to localStorage", e);
    }
  },

  add(entry: MemoryEntry): void {
    const existing = this.getAll();
    this.saveAll([entry, ...existing]);
  },

  getById(id: string): MemoryEntry | undefined {
    const entries = this.getAll();
    return entries.find((e) => e.id === id);
  },
};
