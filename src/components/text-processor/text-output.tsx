import { $, component$ } from "@builder.io/qwik";
import type { PipelineResult } from "~/types/pipeline";
import { StepResultComponent } from "../pipeline/step-result";

interface TextOutputProps {
  result: PipelineResult | null;
  inputText: string;
}

export const TextOutput = component$<TextOutputProps>(({ result }) => {
  const copyToClipboard = $(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.warn("Failed to copy to clipboard:", error);
    }
  });

  if (!result) {
    return (
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Output
          </h3>
        </div>
        <div class="rounded-lg bg-gray-50 p-8 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          Enter some text and configure pipeline stages to see the output
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Output
        </h3>
        <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{result.totalMatches} matches</span>
          <span>•</span>
          <span>{result.processingTime.toFixed(2)}ms</span>
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Final Result
          </label>
          <button
            onClick$={() => copyToClipboard(result.finalOutput)}
            class="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            title="Copy to clipboard"
          >
            <div class="i-heroicons-clipboard h-3 w-3"></div>
            Copy
          </button>
        </div>
        <pre class="step-result max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
          {result.finalOutput}
        </pre>
      </div>

      {result.steps.length > 0 && (
        <div class="space-y-2">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step-by-Step Results
          </h4>
          <div class="max-h-96 space-y-2 overflow-y-auto">
            {result.steps.map((step, index) => (
              <StepResultComponent
                key={step.stageId}
                result={step}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
