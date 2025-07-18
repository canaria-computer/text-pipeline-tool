import { component$, type QRL } from "@builder.io/qwik";
import type { PipelineStage } from "~/types/pipeline";

interface PipelineStageProps {
  stage: PipelineStage;
  onUpdate: QRL<(stage: Partial<PipelineStage>) => void>;
  onDelete: QRL<() => void>;
  onDragStart: QRL<(stageId: string) => void>;
  isDragging: boolean;
}

export const PipelineStageComponent = component$<PipelineStageProps>(
  ({ stage, onUpdate, onDelete, onDragStart, isDragging }) => {
    return (
      <div
        class={[
          "rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-gray-800",
          isDragging ? "dragging" : "hover:shadow-md",
        ]}
        draggable
        onDragStart$={(event) => {
          onDragStart(stage.id);
          if (event.target) {
            (event.target as HTMLElement).classList.add("dragging");
          }
        }}
        onDragEnd$={(event) => {
          if (event.target) {
            (event.target as HTMLElement).classList.remove("dragging");
          }
        }}
      >
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="drag-handle p-1 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <div class="i-heroicons-bars-3 h-4 w-4 cursor-grab active:cursor-grabbing"></div>
            </div>
            <input
              type="text"
              value={stage.name}
              onInput$={(event) =>
                onUpdate({ name: (event.target as HTMLInputElement).value })
              }
              class="rounded border-none bg-transparent px-2 py-1 text-sm font-medium outline-none focus:bg-gray-50 dark:text-white dark:focus:bg-gray-700"
              placeholder="Stage name"
            />
          </div>
          <div class="flex items-center gap-2">
            <label class="inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                class="peer sr-only"
                checked={stage.enabled}
                onChange$={(event) =>
                  onUpdate({
                    enabled: (event.target as HTMLInputElement).checked,
                  })
                }
              />
              <div class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div>
              <span class="sr-only text-gray-600 dark:text-gray-400">
                Enabled
              </span>
            </label>
            <button
              onClick$={onDelete}
              class="bg-red-600 p-1 text-white transition-colors"
              title="Delete stage"
            >
              <div class="i-heroicons-trash h-4 w-4"></div>
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
              Search Pattern
            </label>
            <input
              type="text"
              value={stage.pattern}
              onInput$={(event) =>
                onUpdate({ pattern: (event.target as HTMLInputElement).value })
              }
              class="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter search pattern..."
            />
          </div>

          <div>
            <label class="mb-1 block font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
              Replacement
            </label>
            <input
              type="text"
              value={stage.replacement}
              onInput$={(event) =>
                onUpdate({
                  replacement: (event.target as HTMLInputElement).value,
                })
              }
              class="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter replacement text..."
            />
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                checked={stage.caseSensitive}
                onChange$={(event) =>
                  onUpdate({
                    caseSensitive: (event.target as HTMLInputElement).checked,
                  })
                }
                class="text-primary-600 focus:ring-primary-500 h-3 w-3 rounded border-gray-300 bg-gray-100"
              />
              <div class="i-mdi-format-letter-case size-5 dark:text-white"></div>
              <span class="text-gray-600 dark:text-gray-400">
                Case sensitive
              </span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                checked={stage.wordBoundary}
                onChange$={(event) =>
                  onUpdate({
                    wordBoundary: (event.target as HTMLInputElement).checked,
                  })
                }
                class="text-primary-600 focus:ring-primary-500 h-3 w-3 rounded border-gray-300 bg-gray-100"
              />
              <div class="i-mdi-format-letter-matches size-5 dark:text-white"></div>
              <span class="text-gray-600 dark:text-gray-400">
                Word boundary
              </span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                checked={stage.useRegex}
                onChange$={(event) =>
                  onUpdate({
                    useRegex: (event.target as HTMLInputElement).checked,
                  })
                }
                class="text-primary-600 focus:ring-primary-500 h-3 w-3 rounded border-gray-300 bg-gray-100"
              />
              <div class="i-mdi-regex size-5 dark:text-white"></div>
              <span class="text-gray-600 dark:text-gray-400">Use regex</span>
            </label>
          </div>
        </div>
      </div>
    );
  },
);
