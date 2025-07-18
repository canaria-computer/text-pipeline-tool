import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="from-primary-50 to-primary-100 min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="space-y-8 text-center">
          {/* Hero Section */}
          <div class="space-y-4">
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-gray-100">
              <span class="block">Text Processing</span>
              <span class="text-primary-600 dark:text-primary-400 block">
                Pipeline
              </span>
            </h1>
            <p class="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-400">
              Build powerful multi-stage text transformations with regular
              expressions, drag-and-drop interface, and real-time preview.
            </p>
          </div>

          {/* Features Grid */}
          <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-cog-6-tooth text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Multi-stage Pipeline
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Create complex text transformations with multiple processing
                stages
              </p>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-arrows-up-down text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Drag & Drop
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Reorder pipeline stages with intuitive drag-and-drop interface
              </p>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-eye text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Real-time Preview
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                See transformation results instantly as you build your pipeline
              </p>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-code-bracket text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Regex Support
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Use powerful regular expressions or simple text replacements
              </p>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-list-bullet text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Step-by-step View
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Visualize intermediate results at each processing stage
              </p>
            </div>

            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="i-heroicons-adjustments-horizontal text-primary-600 dark:text-primary-400 mx-auto mb-4 h-12 w-12"></div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
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
              class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-medium shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none dark:text-white"
            >
              <div class="i-heroicons-rocket-launch h-5 w-5"></div>
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
  title: "Text Processing Pipeline - Multi-stage Text Transformer",
  meta: [
    {
      name: "description",
      content:
        "A powerful text processing tool with multi-stage regular expression pipeline, drag-and-drop interface, and real-time preview.",
    },
  ],
};
