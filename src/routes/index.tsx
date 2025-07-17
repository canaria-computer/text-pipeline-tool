import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center space-y-8">
          {/* Hero Section */}
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
              <span class="block">Text Processing</span>
              <span class="block text-primary-600 dark:text-primary-400">Pipeline</span>
            </h1>
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Build powerful multi-stage text transformations with regular expressions,
              drag-and-drop interface, and real-time preview.
            </p>
          </div>

          {/* Features Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-cog-6-tooth text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Multi-stage Pipeline
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Create complex text transformations with multiple processing stages
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-arrows-up-down text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Drag & Drop
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Reorder pipeline stages with intuitive drag-and-drop interface
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-eye text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Real-time Preview
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                See transformation results instantly as you build your pipeline
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-code-bracket text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Regex Support
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Use powerful regular expressions or simple text replacements
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-list-bullet text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Step-by-step View
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Visualize intermediate results at each processing stage
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 i-heroicons-adjustments-horizontal text-primary-600 dark:text-primary-400 mx-auto mb-4"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Advanced Options
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Configure case sensitivity, word boundaries, and more
              </p>
            </div>
          </div>

          {/* CTA */}
          <div class="pt-8">
            <a
              href="/text-processor"
              class="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium dark:text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-lg"
            >
              <div class="w-5 h-5 i-heroicons-rocket-launch"></div>
              Start Processing Text
              <div class="i-heroicons-arrow-right"></div>
            </a>
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
  ],
};