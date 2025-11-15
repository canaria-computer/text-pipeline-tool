import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import type { StepResult } from "~/types/pipeline";
import { calculateDiff } from "~/utils/diff-calculator";
import { DiffViewer } from "../diff/DiffViewer";
import { DiffToggle } from "../diff/DiffToggle";

interface StepResultProps {
  result: StepResult;
  index: number;
}

export const StepResultComponent = component$<StepResultProps>(
  ({ result, index }) => {
    const isExpanded = useSignal(index === 0);
    const showDiff = useSignal(true);

    const diffResult = useComputed$(() => {
      if (!showDiff.value) {
        return null;
      }
      return calculateDiff(result.input, result.output);
    });

    return (
      <div class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick$={() => (isExpanded.value = !isExpanded.value)}
          class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div class="flex items-center gap-3">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
              Step {index + 1}
            </span>
            <span class="font-medium text-gray-900 dark:text-gray-100">
              {result.stageName}
            </span>
            {result.error && (
              <span class="rounded bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-900 dark:text-red-200">
                Error
              </span>
            )}
            {result.matchCount > 0 && (
              <span class="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                {result.matchCount} match{result.matchCount !== 1 ? "es" : ""}
              </span>
            )}
          </div>
          <div
            class={[
              "i-heroicons-chevron-down h-4 w-4 transition-transform",
              isExpanded.value ? "rotate-180" : "",
            ]}
          ></div>
        </button>

        {isExpanded.value && (
          <div class="space-y-3 border-t border-gray-200 px-4 pb-4 pt-3 dark:border-gray-700">
            {result.error && (
              <div class="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                <strong>Error:</strong> {result.error}
              </div>
            )}

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label class="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                  Pattern
                </label>
                <code class="block rounded bg-gray-100 p-2 font-mono text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {result.pattern || "(empty)"}
                </code>
              </div>
              <div>
                <label class="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                  Replacement
                </label>
                <code class="block rounded bg-gray-100 p-2 font-mono text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {result.replacement || "(empty)"}
                </code>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block font-medium text-gray-700 dark:text-gray-300">
                  Changes
                </label>
                <DiffToggle
                  enabled={showDiff.value}
                  onToggle$={() => (showDiff.value = !showDiff.value)}
                  addedCount={diffResult.value?.addedCount}
                  removedCount={diffResult.value?.removedCount}
                />
              </div>

              {showDiff.value && diffResult.value ? (
                <div class="max-h-64 overflow-y-auto rounded bg-gray-50 p-3 dark:bg-gray-700">
                  <DiffViewer segments={diffResult.value.segments} />
                </div>
              ) : (
                <>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Input
                    </label>
                    <pre class="step-result max-h-32 overflow-y-auto rounded bg-gray-50 p-3 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {result.input}
                    </pre>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Output
                    </label>
                    <pre class="step-result max-h-32 overflow-y-auto rounded bg-gray-50 p-3 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      {result.output}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
