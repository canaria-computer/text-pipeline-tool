import type {
  PipelineStage,
  StepResult,
  PipelineResult,
} from "~/types/pipeline";

export function processText(
  input: string,
  stages: PipelineStage[],
): PipelineResult {
  const startTime = performance.now();
  const steps: StepResult[] = [];
  let currentText = input;
  let totalMatches = 0;

  const enabledStages = stages
    .filter((stage) => stage.enabled)
    .sort((a, b) => a.order - b.order);

  for (const stage of enabledStages) {
    const stepResult = processStage(currentText, stage);
    steps.push(stepResult);
    currentText = stepResult.output;
    totalMatches += stepResult.matchCount;
  }

  const processingTime = performance.now() - startTime;

  return {
    steps,
    finalOutput: currentText,
    totalMatches,
    processingTime,
  };
}

function processStage(input: string, stage: PipelineStage): StepResult {
  try {
    let pattern = stage.pattern;
    let flags = "g";

    if (!stage.caseSensitive) {
      flags += "i";
    }

    if (stage.wordBoundary && stage.useRegex) {
      pattern = `\\b${pattern}\\b`;
    }

    let result: string;
    let matchCount = 0;

    if (stage.useRegex) {
      const regex = new RegExp(pattern, flags);
      const matches = input.match(regex);
      matchCount = matches ? matches.length : 0;
      result = input.replace(regex, stage.replacement);
    } else {
      // Simple text replacement
      if (stage.wordBoundary) {
        const escapedPattern = escapeRegExp(pattern);
        const wordBoundaryPattern = `\\b${escapedPattern}\\b`;
        const regex = new RegExp(wordBoundaryPattern, flags);
        const matches = input.match(regex);
        matchCount = matches ? matches.length : 0;
        result = input.replace(regex, stage.replacement);
      } else {
        const searchValue = stage.caseSensitive
          ? new RegExp(escapeRegExp(pattern), "g")
          : new RegExp(escapeRegExp(pattern), "gi");
        const matches = input.match(searchValue);
        matchCount = matches ? matches.length : 0;
        result = input.replace(searchValue, stage.replacement);
      }
    }

    return {
      stageId: stage.id,
      stageName: stage.name,
      input,
      output: result,
      pattern: stage.pattern,
      replacement: stage.replacement,
      matchCount,
    };
  } catch (error) {
    return {
      stageId: stage.id,
      stageName: stage.name,
      input,
      output: input,
      pattern: stage.pattern,
      replacement: stage.replacement,
      matchCount: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function validateRegex(pattern: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    new RegExp(pattern);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid regex pattern",
    };
  }
}
