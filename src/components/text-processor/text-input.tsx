import { component$, type Signal } from '@builder.io/qwik';

interface TextInputProps {
  value: Signal<string>;
  placeholder?: string;
  label?: string;
}

export const TextInput = component$<TextInputProps>(({ value, placeholder, label }) => {
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
        class="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm resize-y"
        spellcheck={false}
      />
    </div>
  );
});