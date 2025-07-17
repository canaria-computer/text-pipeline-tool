import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PipelineBuilder } from '~/components/pipeline/pipeline-builder';
import { TextInput } from '~/components/text-processor/text-input';
import { TextOutput } from '~/components/text-processor/text-output';
import type { PipelineStage } from '~/types/pipeline';
import { processText } from '~/utils/text-processor';

export default component$(() => {
  const inputText = useSignal('');
  const stages = useSignal<PipelineStage[]>([]);

  const result = useComputed$(() => {
    if (!inputText.value || stages.value.length === 0) {
      return null;
    }
    return processText(inputText.value, stages.value);
  });

  const loadExample = $(() => {
    const exampleText = `Hello World! This is a sample text for processing.
Visit https://example.com and contact us at support@example.com.
Phone numbers: (555) 123-4567 and +1-800-555-0199.
Some HTML tags: <div>content</div> and <span class="highlight">text</span>.`;

    const exampleStages: PipelineStage[] = [
      {
        id: 'email-stage',
        name: 'Extract Emails',
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        replacement: '[EMAIL]',
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: 'url-stage',
        name: 'Extract URLs',
        pattern: 'https?://[^\\s]+',
        replacement: '[URL]',
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: 'phone-stage',
        name: 'Extract Phone Numbers',
        pattern: '\\+?1?[-.]?\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}',
        replacement: '[PHONE]',
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
    ];

    inputText.value = exampleText;
    stages.value = exampleStages;
  });

  const clearAll = $(() => {
    inputText.value = '';
    stages.value = [];
  });

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Text Processing Pipeline
              </h1>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Build multi-stage text transformations with regular expressions and simple replacements
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                onClick$={loadExample}
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                <div class="w-4 h-4 i-heroicons-sparkles"></div>
                Load Example
              </button>
              <button
                onClick$={clearAll}
                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <div class="w-4 h-4 i-heroicons-trash"></div>
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Pipeline Configuration */}
          <div class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <PipelineBuilder
                stages={stages.value}
                onStagesChange={$((newStages) => {
                  stages.value = newStages;
                })}
              />
            </div>
          </div>

          {/* Right Column - Input/Output */}
          <div class="space-y-6">
            {/* Input */}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <TextInput
                value={inputText}
                label="Input Text"
                placeholder="Enter your text here to process through the pipeline..."
              />
            </div>

            {/* Output */}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <TextOutput
                result={result.value}
                inputText={inputText.value}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Build powerful text processing pipelines with drag-and-drop stages.
              Supports regular expressions, case sensitivity, word boundaries, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Text Processing Pipeline - Multi-stage Text Transformer',
  meta: [
    {
      name: 'description',
      content: 'A powerful text processing tool with multi-stage regular expression pipeline, drag-and-drop interface, and real-time preview.',
    },
    {
      name: 'keywords',
      content: 'text processing, regex, regular expressions, text transformation, pipeline, batch processing',
    },
  ],
};