import type { PipelineStage } from '~/types/pipeline';

export function reorderStages(stages: PipelineStage[], fromIndex: number, toIndex: number): PipelineStage[] {
  const result = [...stages];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  // Update order numbers
  return result.map((stage, index) => ({
    ...stage,
    order: index,
  }));
}

export function handleDragStart(event: DragEvent, stageId: string): void {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', stageId);
    event.dataTransfer.effectAllowed = 'move';
  }
}

export function handleDragOver(event: DragEvent): void {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
}

export function handleDrop(event: DragEvent): string | null {
  event.preventDefault();
  const stageId = event.dataTransfer?.getData('text/plain');
  return stageId || null;
}

export function findStageIndex(stages: PipelineStage[], stageId: string): number {
  return stages.findIndex(stage => stage.id === stageId);
}