import { component$ } from "@builder.io/qwik";
import type { DiffSegment } from "~/types/diff";

interface DiffViewerProps {
  segments: DiffSegment[];
  mode?: "inline";
}

export const DiffViewer = component$<DiffViewerProps>(
  ({ segments, mode = "inline" }) => {
    return (
      <div class="diff-viewer font-mono text-sm">
        {mode === "inline" && (
          <div class="break-words whitespace-pre-wrap">
            {segments.map((segment, index) => {
              if (segment.type === "add") {
                return (
                  <span
                    key={index}
                    class="bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-100"
                  >
                    {segment.value}
                  </span>
                );
              }

              if (segment.type === "remove") {
                return (
                  <span
                    key={index}
                    class="bg-red-200 text-red-900 line-through decoration-red-600 dark:bg-red-900 dark:text-red-100 dark:decoration-red-300"
                  >
                    {segment.value}
                  </span>
                );
              }

              return (
                <span key={index} class="text-gray-800 dark:text-gray-200">
                  {segment.value}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
