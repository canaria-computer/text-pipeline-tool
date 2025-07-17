import { component$, useStore, $, type QRL } from '@builder.io/qwik';
import type { PipelineStage, DragState } from '~/types/pipeline';
import { PipelineStageComponent } from './pipeline-stage';
import { reorderStages, findStageIndex } from '~/utils/drag-drop';

interface PipelineBuilderProps {
  stages: PipelineStage[];
  onStagesChange: QRL<(stages: PipelineStage[]) => void>;
}

export const PipelineBuilder = component$<PipelineBuilderProps>(({ stages, onStagesChange }) => {
  const dragState = useStore<DragState>({
    isDragging: false,
    draggedStageId: null,
    dropTargetIndex: null,
  });

  const addStage = $(() => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: `Stage ${stages.length + 1}`,
      pattern: '',
      replacement: '',
      caseSensitive: false,
      wordBoundary: false,
      useRegex: false,
      enabled: true,
      order: stages.length,
    };
    onStagesChange([...stages, newStage]);
  });

  const updateStage = $((stageId: string, updates: Partial<PipelineStage>) => {
    const updatedStages = stages.map(stage =>
      stage.id === stageId ? { ...stage, ...updates } : stage
    );
    onStagesChange(updatedStages);
  });

  const deleteStage = $((stageId: string) => {
    const filteredStages = stages.filter(stage => stage.id !== stageId);
    const reorderedStages = filteredStages.map((stage, index) => ({
      ...stage,
      order: index,
    }));
    onStagesChange(reorderedStages);
  });

  const handleDragStart = $((stageId: string) => {
    dragState.isDragging = true;
    dragState.draggedStageId = stageId;
  });

  const handleDragEnd = $(() => {
    dragState.isDragging = false;
    dragState.draggedStageId = null;
    dragState.dropTargetIndex = null;
  });

  const handleDragOver = $((event: DragEvent, targetIndex: number) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    dragState.dropTargetIndex = targetIndex;
  });

  const handleDrop = $((event: DragEvent, targetIndex: number) => {
    event.preventDefault();

    if (!dragState.draggedStageId) return;

    const fromIndex = findStageIndex(stages, dragState.draggedStageId);
    if (fromIndex === -1 || fromIndex === targetIndex) return;

    const reorderedStages = reorderStages(stages, fromIndex, targetIndex);
    onStagesChange(reorderedStages);

    handleDragEnd();
  });

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Processing Pipeline
        </h2>
        <button
          onClick$={addStage}
          class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium dark:text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <div class="w-4 h-4 i-heroicons-plus"></div>
          Add Stage
        </button>
      </div>

      {stages.length === 0 ? (
        <div class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div class="w-12 h-12 i-heroicons-cog-6-tooth mx-auto text-gray-400 mb-4"></div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No stages yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Add your first processing stage to get started
          </p>
          <button
            onClick$={addStage}
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <div class="w-4 h-4 i-heroicons-plus"></div>
            Add First Stage
          </button>
        </div>
      ) : (
        <div class="space-y-3">
          {stages
            .sort((a, b) => a.order - b.order)
            .map((stage, index) => (
              <div
                key={stage.id}
                class={[
                  'relative',
                  dragState.dropTargetIndex === index ? 'drop-zone active' : '',
                ]}
                onDragOver$={(event) => handleDragOver(event, index)}
                onDrop$={(event) => handleDrop(event, index)}
              >
                <PipelineStageComponent
                  stage={stage}
                  onUpdate={$((updatedFields: Partial<PipelineStage>) => updateStage(stage.id, updatedFields))}
                  onDelete={$(() => deleteStage(stage.id))}
                  onDragStart={handleDragStart}
                  isDragging={dragState.isDragging && dragState.draggedStageId === stage.id}
                />
              </div>
            ))}

          <div
            class={[
              'drop-zone h-16 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm',
              dragState.dropTargetIndex === stages.length ? 'active' : '',
            ]}
            onDragOver$={(event) => handleDragOver(event, stages.length)}
            onDrop$={(event) => handleDrop(event, stages.length)}
          >
            Drop here to add at the end
          </div>
        </div>
      )}
    </div>
  );
});
