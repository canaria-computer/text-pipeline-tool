import { describe, expect, it, vi } from "vitest";
import { processText } from "./text-processor";
import type { PipelineStage } from "~/types/pipeline";

vi.mock("./wasm-helper", () => ({
  unescapeString: (input: string) =>
    input.replace(/\\n/g, "\n").replace(/\\t/g, "\t"),
  isWasmReady: () => true,
  initWasm: async () => {},
}));

describe("processText with WASM unescape", () => {
  it("should unescape input when option is enabled", () => {
    const input = "Hello\\nWorld";
    const stages: PipelineStage[] = [];

    const result = processText(input, stages, { unescapeInput: true });

    expect(result.finalOutput).toBe("Hello\nWorld");
  });

  it("should process escaped patterns correctly", () => {
    const input = "Hello World";
    const stages: PipelineStage[] = [
      {
        id: "1",
        name: "Replace with newline",
        pattern: " ",
        replacement: "\\n",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 0,
      },
    ];

    const result = processText(input, stages);

    expect(result.finalOutput).toBe("Hello\nWorld");
  });
});
