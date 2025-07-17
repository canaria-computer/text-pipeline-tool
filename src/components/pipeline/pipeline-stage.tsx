import { component$, type QRL } from '@builder.io/qwik';
import type { PipelineStage } from '~/types/pipeline';

interface PipelineStageProps {
  stage: PipelineStage;
  onUpdate: QRL<(stage: Partial<PipelineStage>) => void>;
  onDelete: QRL<() => void>;
  onDragStart: QRL<(stageId: string) => void>;
  isDragging: boolean;
}

export const PipelineStageComponent = component$<PipelineStageProps>(({
  stage,
  onUpdate,
  onDelete,
  onDragStart,
  isDragging,
}) => {
  return (
    <div
      class={[
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm transition-all duration-200',
        isDragging ? 'dragging' : 'hover:shadow-md',
      ]}
      draggable
      onDragStart$={(event) => {
        onDragStart(stage.id);
        if (event.target) {
          (event.target as HTMLElement).classList.add('dragging');
        }
      }}
      onDragEnd$={(event) => {
        if (event.target) {
          (event.target as HTMLElement).classList.remove('dragging');
        }
      }}
    >
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="drag-handle p-1 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <div class="w-4 h-4 i-heroicons-bars-3 cursor-grab active:cursor-grabbing"></div>
          </div>
          <input
            type="text"
            value={stage.name}
            onInput$={(event) => onUpdate({ name: (event.target as HTMLInputElement).value })}
            class="font-medium text-sm bg-transparent border-none outline-none focus:bg-gray-50 dark:focus:bg-gray-700 dark:text-white px-2 py-1 rounded"
            placeholder="Stage name"
          />
        </div>
        <div class="flex items-center gap-2">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" checked={stage.enabled}
              onChange$={(event) => onUpdate({ enabled: (event.target as HTMLInputElement).checked })}
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span class="text-gray-600 dark:text-gray-400 sr-only">Enabled</span>
          </label>
          <button
            onClick$={onDelete}
            class="p-1 text-white bg-red-600 transition-colors"
            title="Delete stage"
          >
            <div class="w-4 h-4 i-heroicons-trash"></div>
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search Pattern
          </label>
          <input
            type="text"
            value={stage.pattern}
            onInput$={(event) => onUpdate({ pattern: (event.target as HTMLInputElement).value })}
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md font-mono focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter search pattern..."
          />
        </div>

        <div>
          <label class="block text-xs font-medium font-mono text-gray-700 dark:text-gray-300 mb-1">
            Replacement
          </label>
          <input
            type="text"
            value={stage.replacement}
            onInput$={(event) => onUpdate({ replacement: (event.target as HTMLInputElement).value })}
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md font-mono focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter replacement text..."
          />
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={stage.caseSensitive}
              onChange$={(event) => onUpdate({ caseSensitive: (event.target as HTMLInputElement).checked })}
              class="w-3 h-3 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <div class="i-mdi-format-letter-case size-5 dark:text-white"></div>
            <span class="text-gray-600 dark:text-gray-400">Case sensitive</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={stage.wordBoundary}
              onChange$={(event) => onUpdate({ wordBoundary: (event.target as HTMLInputElement).checked })}
              class="w-3 h-3 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <div class="i-mdi-format-letter-matches size-5 dark:text-white"></div>
            <span class="text-gray-600 dark:text-gray-400">Word boundary</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              checked={stage.useRegex}
              onChange$={(event) => onUpdate({ useRegex: (event.target as HTMLInputElement).checked })}
              class="w-3 h-3 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <div class="i-mdi-regex size-5 dark:text-white"></div>
            <span class="text-gray-600 dark:text-gray-400">Use regex</span>
          </label>
        </div>
      </div>
    </div>
  );
});