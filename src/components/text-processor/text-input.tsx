import { component$, type Signal } from "@builder.io/qwik";

interface TextInputProps {
  value: Signal<string>;
  placeholder?: string;
  label?: string;
}

export const TextInput = component$<TextInputProps>(
  ({ value, placeholder, label }) => {
    return (
      <div class="space-y-2">
        {label && (
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          value={value.value}
          onInput$={(event) => {
            value.value = (event.target as HTMLTextAreaElement).value;
          }}
          placeholder={placeholder}
          class="focus:ring-primary-500 h-64 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          spellcheck={false}
        />
      </div>
    );
  },
);
