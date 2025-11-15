export type DiffType = "add" | "remove" | "equal";

export interface DiffSegment {
  type: DiffType;
  value: string;
}

export interface DiffResult {
  segments: DiffSegment[];
  addedCount: number;
  removedCount: number;
}
