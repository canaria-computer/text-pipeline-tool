import { component$, useStore, $, type QRL } from "@builder.io/qwik";
import type { PipelineStage, DragState } from "~/types/pipeline";
import { PipelineStageComponent } from "./pipeline-stage";
import { nanoid } from "nanoid";

interface PipelineBuilderProps {
  stages: PipelineStage[];
  onStagesChange: QRL<(stages: PipelineStage[]) => void>;
}

export const PipelineBuilder = component$<PipelineBuilderProps>(
  ({ stages, onStagesChange }) => {
    const dragState = useStore<DragState>({
      isDragging: false,
      draggedStageId: null,
      dropTargetIndex: null,
    });

    const addStage = $(() => {
      const newStage: PipelineStage = {
        id: nanoid(),
        name: `Stage ${stages.length + 1}`,
        pattern: "",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: stages.length,
      };
      onStagesChange([...stages, newStage]);
    });

    const updateStage = $(
      (stageId: string, updates: Partial<PipelineStage>) => {
        const updatedStages = stages.map((stage) =>
          stage.id === stageId ? { ...stage, ...updates } : stage,
        );
        onStagesChange(updatedStages);
      },
    );

    const deleteStage = $((stageId: string) => {
      const filteredStages = stages.filter((stage) => stage.id !== stageId);
      const reorderedStages = filteredStages.map((stage, index) => ({
        ...stage,
        order: index,
      }));
      onStagesChange(reorderedStages);
    });

    const moveStageUp = $((stageId: string) => {
      const sortedStages = [...stages].sort((a, b) => a.order - b.order);
      const currentIndex = sortedStages.findIndex((s) => s.id === stageId);
      if (currentIndex <= 0) return;

      const newStages = [...sortedStages];
      [newStages[currentIndex], newStages[currentIndex - 1]] = [
        newStages[currentIndex - 1],
        newStages[currentIndex],
      ];

      const reorderedStages = newStages.map((stage, index) => ({
        ...stage,
        order: index,
      }));
      onStagesChange(reorderedStages);
    });

    const moveStageDown = $((stageId: string) => {
      const sortedStages = [...stages].sort((a, b) => a.order - b.order);
      const currentIndex = sortedStages.findIndex((s) => s.id === stageId);
      if (currentIndex === -1 || currentIndex >= sortedStages.length - 1) return;

      const newStages = [...sortedStages];
      [newStages[currentIndex], newStages[currentIndex + 1]] = [
        newStages[currentIndex + 1],
        newStages[currentIndex],
      ];

      const reorderedStages = newStages.map((stage, index) => ({
        ...stage,
        order: index,
      }));
      onStagesChange(reorderedStages);
    });

    const handleDragStart = $((stageId: string) => {
      dragState.isDragging = true;
      dragState.draggedStageId = stageId;
      dragState.dropTargetIndex = null;
    });

    const handleDragEnd = $(() => {
      dragState.isDragging = false;
      dragState.draggedStageId = null;
      dragState.dropTargetIndex = null;
    });

    const handleDragOver = $((event: DragEvent, targetIndex: number) => {
      event.preventDefault();
      event.stopPropagation();

      if (!dragState.isDragging || !dragState.draggedStageId) return;

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }

      dragState.dropTargetIndex = targetIndex;
    });

    const handleDrop = $((event: DragEvent, targetIndex: number) => {
      event.preventDefault();
      event.stopPropagation();

      if (!dragState.draggedStageId) {
        handleDragEnd();
        return;
      }

      const sortedStages = [...stages].sort((a, b) => a.order - b.order);
      const fromIndex = sortedStages.findIndex(
        (s) => s.id === dragState.draggedStageId,
      );

      if (fromIndex === -1) {
        handleDragEnd();
        return;
      }

      if (fromIndex !== targetIndex) {
        const newStages = [...sortedStages];
        const [movedStage] = newStages.splice(fromIndex, 1);
        newStages.splice(targetIndex, 0, movedStage);

        const reorderedStages = newStages.map((stage, index) => ({
          ...stage,
          order: index,
        }));
        onStagesChange(reorderedStages);
      }

      handleDragEnd();
    });

    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    return (
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Processing Pipeline
          </h2>
          <button
            onClick$={addStage}
            class="group relative inline-block overflow-hidden border border-stone-600 px-8 py-3"
          >
            <span class="absolute inset-y-0 left-0 w-0.5 bg-stone-600 transition-all group-hover:w-full" />
            <div class="relative flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors group-hover:text-white">
              <div class="i-heroicons-plus h-4 w-4" />
              Add Stage
            </div>
          </button>
        </div>

        {stages.length === 0 ? (
          <div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center dark:border-gray-600 dark:bg-gray-800">
            <div class="i-heroicons-cog-6-tooth mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
              No stages yet
            </h3>
            <p class="mb-4 text-gray-500 dark:text-gray-400">
              Add your first processing stage to get started
            </p>
            <button
              onClick$={addStage}
              class="text-primary-600 border-primary-600 hover:bg-primary-50 focus:ring-primary-500 inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <div class="i-heroicons-plus h-4 w-4"></div>
              Add First Stage
            </button>
          </div>
        ) : (
          <div class="space-y-3">
            {sortedStages.map((stage) => {
              const stageIndex = sortedStages.findIndex((s) => s.id === stage.id);
              return (
                <div
                  key={stage.id}
                  class="relative"
                  onDragOver$={(event) => handleDragOver(event, stageIndex)}
                  onDrop$={(event) => handleDrop(event, stageIndex)}
                >
                  <PipelineStageComponent
                    stage={stage}
                    onUpdate={$((updatedFields: Partial<PipelineStage>) =>
                      updateStage(stage.id, updatedFields),
                    )}
                    onDelete={$(() => deleteStage(stage.id))}
                    onMoveUp={$(() => moveStageUp(stage.id))}
                    onMoveDown={$(() => moveStageDown(stage.id))}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={
                      dragState.isDragging &&
                      dragState.draggedStageId === stage.id
                    }
                    isFirst={stageIndex === 0}
                    isLast={stageIndex === sortedStages.length - 1}
                    isDropTarget={
                      dragState.isDragging &&
                      dragState.dropTargetIndex === stageIndex &&
                      dragState.draggedStageId !== stage.id
                    }
                  />
                </div>
              );
            })}

            <div
              class={[
                "flex h-16 items-center justify-center rounded-lg border-2 border-dashed text-sm transition-colors",
                dragState.isDragging &&
                  dragState.dropTargetIndex === sortedStages.length
                  ? "border-gray-300 bg-blue-100 text-blue-700 dark:border-gray-600 dark:bg-blue-900/30 dark:text-blue-300"
                  : "border-gray-300 bg-transparent text-gray-400 dark:border-gray-600 dark:text-gray-500",
              ]}
              onDragOver$={(event) => handleDragOver(event, sortedStages.length)}
              onDrop$={(event) => handleDrop(event, sortedStages.length)}
            >
              {dragState.isDragging &&
                dragState.dropTargetIndex === sortedStages.length
                ? "Release to drop here"
                : "Drop here to add at the end"}
            </div>
          </div>
        )}
      </div>
    );
  },
);
