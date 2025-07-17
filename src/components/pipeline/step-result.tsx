import { component$, useSignal } from '@builder.io/qwik';
import type { StepResult } from '~/types/pipeline';

interface StepResultProps {
  result: StepResult;
  index: number;
}

export const StepResultComponent = component$<StepResultProps>(({ result, index }) => {
  const isExpanded = useSignal(index === 0);

  return (
    <div class="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <button
        onClick$={() => (isExpanded.value = !isExpanded.value)}
        class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
            Step {index + 1}
          </span>
          <span class="font-medium text-gray-900 dark:text-gray-100">
            {result.stageName}
          </span>
          {result.error && (
            <span class="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
              Error
            </span>
          )}
          {result.matchCount > 0 && (
            <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
            </span>
          )}
        </div>
        <div class={[
          'w-4 h-4 i-heroicons-chevron-down transition-transform',
          isExpanded.value ? 'rotate-180' : '',
        ]}></div>
      </button>

      {isExpanded.value && (
        <div class="px-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
          {result.error && (
            <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-300">
              <strong>Error:</strong> {result.error}
            </div>
          )}

          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pattern
              </label>
              <code class="block p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono">
                {result.pattern || '(empty)'}
              </code>
            </div>
            <div>
              <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Replacement
              </label>
              <code class="block p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono">
                {result.replacement || '(empty)'}
              </code>
            </div>
          </div>

          <div>
            <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Input
            </label>
            <pre class="p-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm step-result max-h-32 overflow-y-auto">
              {result.input}
            </pre>
          </div>

          <div>
            <label class="block font-medium text-gray-700 dark:text-gray-300 mb-1">
              Output
            </label>
            <pre class="p-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm step-result max-h-32 overflow-y-auto">
              {result.output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
});