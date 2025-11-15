import { component$ } from "@builder.io/qwik";
import { MilestoneItem, milestones } from "~/data/milestones";

export default component$(() => {
  const completedMilestones = milestones.filter((m) => m.completed);
  const upcomingMilestones = milestones.filter((m) => !m.completed);

  return (
    <div class="milestone-page min-h-screen bg-white dark:bg-gray-950">
      <div class="circuit-background"></div>

      <div class="relative z-10 mx-auto max-w-4xl px-4 py-16">
        <div class="mb-12 text-center">
          <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Project Milestones
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Track our journey from alpha to production-ready text processing
            pipeline tool
          </p>
        </div>

        {completedMilestones.length > 0 && (
          <section class="mb-16">
            <h2 class="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
              Completed
            </h2>
            <TimelineList items={completedMilestones} />
          </section>
        )}

        <section>
          <h2 class="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
            Upcoming Goals
          </h2>
          <TimelineList items={upcomingMilestones} />
        </section>
      </div>
    </div>
  );
});

const TimelineList = component$<{ items: MilestoneItem[] }>(({ items }) => {
  return (
    <ul class="flex w-full flex-col gap-6">
      {items.map((item, index) => (
        <li key={item.id} class="relative flex flex-col gap-2">
          {index < items.length - 1 && (
            <span class="timeline-connector absolute left-6 top-14 h-[calc(100%+1.5rem)] w-0.5 bg-gray-200 dark:bg-gray-700"></span>
          )}

          <div
            class={[
              "timeline-item relative flex gap-4 rounded-lg border-2 bg-white p-6 transition-all duration-300 hover:border-opacity-100 dark:bg-gray-900",
              item.completed
                ? "border-green-300 dark:border-green-700"
                : "border-blue-300 dark:border-blue-700",
            ]}
          >
            <span
              class={[
                "relative z-[2] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
                item.completed
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
              ]}
            >
              {item.completed ? (
                <div class="i-heroicons-check-circle h-7 w-7"></div>
              ) : (
                <div class="i-heroicons-clock h-7 w-7"></div>
              )}
            </span>

            <div class="flex flex-1 flex-col gap-3">
              <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.date && (
                  <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.date}
                  </span>
                )}
              </div>

              <p class="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </p>

              {item.features && item.features.length > 0 && (
                <ul class="mt-2 space-y-2">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      class="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span
                        class={[
                          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                          item.completed
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                        ]}
                      >
                        <div class="i-heroicons-check h-3 w-3"></div>
                      </span>
                      <span class="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2 inline-flex w-fit items-center gap-2 rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                >
                  <div class="i-heroicons-arrow-top-right-on-square h-4 w-4"></div>
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});
