export interface PipelineStage {
  id: string;
  name: string;
  pattern: string;
  replacement: string;
  caseSensitive: boolean;
  wordBoundary: boolean;
  useRegex: boolean;
  enabled: boolean;
  order: number;
}

export interface StepResult {
  stageId: string;
  stageName: string;
  input: string;
  output: string;
  pattern: string;
  replacement: string;
  matchCount: number;
  error?: string;
}

export interface PipelineResult {
  steps: StepResult[];
  finalOutput: string;
  totalMatches: number;
  processingTime: number;
}

export interface DragState {
  isDragging: boolean;
  draggedStageId: string | null;
  dropTargetIndex: number | null;
}
