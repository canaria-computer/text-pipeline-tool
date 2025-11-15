import { diffChars, type Change } from "diff";
import type { DiffSegment, DiffResult, DiffType } from "~/types/diff";

export const calculateDiff = (oldText: string, newText: string): DiffResult => {
  const changes: Change[] = diffChars(oldText, newText);

  let addedCount = 0;
  let removedCount = 0;

  const segments: DiffSegment[] = changes.map((change) => {
    let type: DiffType = 'equal';

    if (change.added) {
      type = 'add';
      addedCount += change.value.length;
    } else if (change.removed) {
      type = 'remove';
      removedCount += change.value.length;
    }

    return {
      type,
      value: change.value,
    };
  });

  return {
    segments,
    addedCount,
    removedCount,
  };
};
