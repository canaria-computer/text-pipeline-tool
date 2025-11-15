import type {
  PipelineStage,
  StepResult,
  PipelineResult,
} from "~/types/pipeline";
import { unescapeString, isWasmReady } from "./wasm-helper";

export function processText(
  input: string,
  stages: PipelineStage[],
  options?: { unescapeInput?: boolean; unescapeOutput?: boolean }
): PipelineResult {
  const startTime = performance.now();
  const steps: StepResult[] = [];
  let totalMatches = 0;

  let currentText = input;
  if (options?.unescapeInput && isWasmReady()) {
    currentText = unescapeString(input);
  }

  const enabledStages = stages
    .filter((stage) => stage.enabled)
    .sort((a, b) => a.order - b.order);

  for (const stage of enabledStages) {
    const stepResult = processStage(currentText, stage);
    steps.push(stepResult);
    currentText = stepResult.output;
    totalMatches += stepResult.matchCount;
  }

  if (options?.unescapeOutput && isWasmReady()) {
    currentText = unescapeString(currentText);
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
    let replacement = stage.replacement;
    let flags = "g";

    if (isWasmReady()) {
      pattern = unescapeString(pattern);
      replacement = unescapeString(replacement);
    }

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
      result = input.replace(regex, replacement);
    } else {
      if (stage.wordBoundary) {
        const escapedPattern = escapeRegExp(pattern);
        const wordBoundaryPattern = `\\b${escapedPattern}\\b`;
        const regex = new RegExp(wordBoundaryPattern, flags);
        const matches = input.match(regex);
        matchCount = matches ? matches.length : 0;
        result = input.replace(regex, replacement);
      } else {
        const searchValue = stage.caseSensitive
          ? new RegExp(escapeRegExp(pattern), "g")
          : new RegExp(escapeRegExp(pattern), "gi");
        const matches = input.match(searchValue);
        matchCount = matches ? matches.length : 0;
        result = input.replace(searchValue, replacement);
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
    const processedPattern = isWasmReady()
      ? unescapeString(pattern)
      : pattern;
    new RegExp(processedPattern);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid regex pattern",
    };
  }
}
