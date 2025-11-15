import { component$, type QRL } from "@builder.io/qwik";

interface DiffToggleProps {
  enabled: boolean;
  onToggle$: QRL<() => void>;
  addedCount?: number;
  removedCount?: number;
}

export const DiffToggle = component$<DiffToggleProps>(
  ({ enabled, onToggle$, addedCount = 0, removedCount = 0 }) => {
    return (
      <button
        onClick$={onToggle$}
        class={[
          "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
          enabled
            ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
        ]}
        title={enabled ? "Hide differences" : "Show differences"}
      >
        <div
          class={[
            "h-3.5 w-3.5",
            enabled ? "i-heroicons-eye" : "i-heroicons-eye-slash",
          ]}
        ></div>
        <span>{enabled ? "Hide" : "Show"} Diff</span>
        {enabled && (addedCount > 0 || removedCount > 0) && (
          <span class="ml-1 flex items-center gap-1">
            {addedCount > 0 && (
              <span class="text-green-700 dark:text-green-300">
                +{addedCount}
              </span>
            )}
            {removedCount > 0 && (
              <span class="text-red-700 dark:text-red-300">
                -{removedCount}
              </span>
            )}
          </span>
        )}
      </button>
    );
  }
);
