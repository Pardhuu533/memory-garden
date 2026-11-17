export type JournalSheetMode = "closed" | "drafting" | "planted_confirmation" | "viewing";

export interface JournalDraft {
  text: string;
  selectedSpeciesId?: string;
  date: Date;
}
