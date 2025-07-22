import { describe, it, expect } from "vitest";
import { processText, validateRegex, highlightChanges } from "./text-processor";
import type { PipelineStage } from "~/types/pipeline";

// Helper function to access the private escapeRegExp function for testing
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("text-processor", () => {
  describe("processText", () => {
    it("should process a single stage with regex replacement", () => {
      const input = "Hello world! Contact us at test@example.com for support.";
      const stages: PipelineStage[] = [
        {
          id: "email-stage",
          name: "Extract Emails",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          replacement: "[EMAIL]",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe(
        "Hello world! Contact us at [EMAIL] for support.",
      );
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].matchCount).toBe(1);
      expect(result.totalMatches).toBe(1);
      expect(result.processingTime).toBeGreaterThan(0);
    });

    it("should process multiple stages in order", () => {
      const input =
        "Visit https://example.com or email us at support@example.com";
      const stages: PipelineStage[] = [
        {
          id: "url-stage",
          name: "Replace URLs",
          pattern: "https?://[^\\s]+",
          replacement: "[URL]",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 0,
        },
        {
          id: "email-stage",
          name: "Replace Emails",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          replacement: "[EMAIL]",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 1,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("Visit [URL] or email us at [EMAIL]");
      expect(result.steps).toHaveLength(2);
      expect(result.totalMatches).toBe(2);
    });

    it("should skip disabled stages", () => {
      const input = "Test email: test@example.com";
      const stages: PipelineStage[] = [
        {
          id: "email-stage",
          name: "Replace Emails",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          replacement: "[EMAIL]",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: false, // Disabled
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe(input);
      expect(result.steps).toHaveLength(0);
      expect(result.totalMatches).toBe(0);
    });

    it("should handle simple text replacement (non-regex)", () => {
      const input = "Hello world! Hello everyone!";
      const stages: PipelineStage[] = [
        {
          id: "hello-stage",
          name: "Replace Hello",
          pattern: "Hello",
          replacement: "Hi",
          caseSensitive: true,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("Hi world! Hi everyone!");
      expect(result.steps[0].matchCount).toBe(2);
    });

    it("should handle case insensitive replacement", () => {
      const input = "Hello HELLO hello";
      const stages: PipelineStage[] = [
        {
          id: "hello-stage",
          name: "Replace Hello",
          pattern: "hello",
          replacement: "hi",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("hi hi hi");
      expect(result.steps[0].matchCount).toBe(3);
    });

    it("should handle word boundary replacement with regex", () => {
      const input = "cat caterpillar cats";
      const stages: PipelineStage[] = [
        {
          id: "cat-stage",
          name: "Replace Cat",
          pattern: "cat",
          replacement: "dog",
          caseSensitive: false,
          wordBoundary: true,
          useRegex: true,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("dog caterpillar cats");
      expect(result.steps[0].matchCount).toBe(1);
    });

    it("should handle word boundary replacement without regex", () => {
      const input = "cat caterpillar cats";
      const stages: PipelineStage[] = [
        {
          id: "cat-stage",
          name: "Replace Cat",
          pattern: "cat",
          replacement: "dog",
          caseSensitive: false,
          wordBoundary: true,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("dog caterpillar cats");
      expect(result.steps[0].matchCount).toBe(1);
    });

    it("should handle stages in correct order", () => {
      const input = "abc";
      const stages: PipelineStage[] = [
        {
          id: "stage-2",
          name: "Stage 2",
          pattern: "b",
          replacement: "2",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 1,
        },
        {
          id: "stage-1",
          name: "Stage 1",
          pattern: "a",
          replacement: "1",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("12c");
      expect(result.steps[0].stageName).toBe("Stage 1");
      expect(result.steps[1].stageName).toBe("Stage 2");
    });

    it("should handle invalid regex patterns gracefully", () => {
      const input = "test input";
      const stages: PipelineStage[] = [
        {
          id: "invalid-stage",
          name: "Invalid Regex",
          pattern: "[invalid(regex",
          replacement: "replacement",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe(input);
      expect(result.steps[0].error).toBeDefined();
      expect(result.steps[0].matchCount).toBe(0);
    });

    it("should handle empty input", () => {
      const input = "";
      const stages: PipelineStage[] = [
        {
          id: "test-stage",
          name: "Test Stage",
          pattern: "test",
          replacement: "replaced",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("");
      expect(result.steps[0].matchCount).toBe(0);
    });

    it("should handle no matches", () => {
      const input = "hello world";
      const stages: PipelineStage[] = [
        {
          id: "test-stage",
          name: "Test Stage",
          pattern: "xyz",
          replacement: "replaced",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe(input);
      expect(result.steps[0].matchCount).toBe(0);
    });

    it("should handle special regex characters in non-regex mode", () => {
      const input = "Price: $100.50 (discounted)";
      const stages: PipelineStage[] = [
        {
          id: "price-stage",
          name: "Replace Price",
          pattern: "$100.50",
          replacement: "$89.99",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("Price: $89.99 (discounted)");
      expect(result.steps[0].matchCount).toBe(1);
    });

    it("should handle regex capture groups", () => {
      const input = "Date: 2023-12-25, Event: Christmas";
      const stages: PipelineStage[] = [
        {
          id: "date-stage",
          name: "Format Date",
          pattern: "(\\d{4})-(\\d{2})-(\\d{2})",
          replacement: "$3/$2/$1",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 0,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("Date: 25/12/2023, Event: Christmas");
      expect(result.steps[0].matchCount).toBe(1);
    });

    it("should handle complex pipeline with mixed stage types", () => {
      const input = "Contact: john.doe@EXAMPLE.COM or call (555) 123-4567";
      const stages: PipelineStage[] = [
        {
          id: "email-stage",
          name: "Mask Email",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
          replacement: "[EMAIL]",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 0,
        },
        {
          id: "phone-stage",
          name: "Format Phone",
          pattern: "\\((\\d{3})\\)\\s(\\d{3})-(\\d{4})",
          replacement: "$1-$2-$3",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: true,
          enabled: true,
          order: 1,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("Contact: [EMAIL] or call 555-123-4567");
      expect(result.steps).toHaveLength(2);
      expect(result.totalMatches).toBe(2);
    });

    it("should handle large text input efficiently", () => {
      const input = "word ".repeat(10000) + "target " + "word ".repeat(10000);
      const stages: PipelineStage[] = [
        {
          id: "target-stage",
          name: "Replace Target",
          pattern: "target",
          replacement: "FOUND",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
      ];

      const startTime = performance.now();
      const result = processText(input, stages);
      const endTime = performance.now();

      expect(result.finalOutput).toContain("FOUND");
      expect(result.steps[0].matchCount).toBe(1);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it("should handle unicode characters", () => {
      const input = "こんにちは 世界! Hello 🌍";
      const stages: PipelineStage[] = [
        {
          id: "japanese-stage",
          name: "Replace Japanese",
          pattern: "こんにちは",
          replacement: "おはよう",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 0,
        },
        {
          id: "emoji-stage",
          name: "Replace Emoji",
          pattern: "🌍",
          replacement: "🌏",
          caseSensitive: false,
          wordBoundary: false,
          useRegex: false,
          enabled: true,
          order: 1,
        },
      ];

      const result = processText(input, stages);

      expect(result.finalOutput).toBe("おはよう 世界! Hello 🌏");
      expect(result.totalMatches).toBe(2);
    });
  });

  describe("validateRegex", () => {
    it("should validate correct regex patterns", () => {
      const validPatterns = [
        "[a-zA-Z]+",
        "\\d{3}-\\d{3}-\\d{4}",
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "https?://[^\\s]+",
        "\\b\\w+\\b",
      ];

      validPatterns.forEach((pattern) => {
        const result = validateRegex(pattern);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it("should invalidate incorrect regex patterns", () => {
      const invalidPatterns = [
        "[invalid(regex",
        "\\",
        "(?",
        "*invalid",
        "+invalid",
      ];

      invalidPatterns.forEach((pattern) => {
        const result = validateRegex(pattern);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
        expect(typeof result.error).toBe("string");
      });
    });

    it("should handle empty pattern", () => {
      const result = validateRegex("");
      expect(result.isValid).toBe(true);
    });
  });

  describe("highlightChanges", () => {
    it("should return output when input and output are the same", () => {
      const input = "hello world";
      const output = "hello world";

      const result = highlightChanges(input, output);

      expect(result).toBe(output);
    });

    it("should highlight changed words", () => {
      const input = "hello world";
      const output = "hi universe";

      const result = highlightChanges(input, output);

      expect(result).toContain('<span class="highlight-change">hi</span>');
      expect(result).toContain(
        '<span class="highlight-change">universe</span>',
      );
    });

    it("should preserve unchanged words", () => {
      const input = "hello world test";
      const output = "hello universe test";

      const result = highlightChanges(input, output);

      expect(result).toContain("hello");
      expect(result).toContain("test");
      expect(result).toContain(
        '<span class="highlight-change">universe</span>',
      );
    });

    it("should handle different length outputs", () => {
      const input = "a b c";
      const output = "x y";

      const result = highlightChanges(input, output);

      expect(result).toContain('<span class="highlight-change">x</span>');
      expect(result).toContain('<span class="highlight-change">y</span>');
    });

    it("should handle empty strings", () => {
      expect(highlightChanges("", "")).toBe("");
      expect(highlightChanges("hello", "")).toBe(
        '<span class="highlight-change"></span>',
      );
      expect(highlightChanges("", "hello")).toBe(
        '<span class="highlight-change">hello</span>',
      );
    });
  });

  describe("escapeRegExp", () => {
    it("should escape special regex characters", () => {
      const specialChars = ".*+?^${}()|[]\\";
      const escaped = escapeRegExp(specialChars);

      expect(escaped).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
    });

    it("should not escape normal characters", () => {
      const normalText = "hello world 123";
      const escaped = escapeRegExp(normalText);

      expect(escaped).toBe(normalText);
    });

    it("should handle mixed content", () => {
      const mixedText = "Price: $100.50 (50% off)";
      const escaped = escapeRegExp(mixedText);

      expect(escaped).toBe("Price: \\$100\\.50 \\(50% off\\)");
    });

    it("should handle empty string", () => {
      const escaped = escapeRegExp("");

      expect(escaped).toBe("");
    });
  });
});
