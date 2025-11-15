import { describe, expect, it } from "vitest";
import { calculateDiff } from "./diff-calculator";

describe("calculateDiff", () => {
  describe("Normal Cases", () => {
    it("should detect added characters", () => {
      const oldText = "Hello";
      const newText = "Hello World";

      const result = calculateDiff(oldText, newText);

      expect(result.segments).toHaveLength(2);
      expect(result.segments[0]).toEqual({ type: "equal", value: "Hello" });
      expect(result.segments[1]).toEqual({ type: "add", value: " World" });
      expect(result.addedCount).toBe(6);
      expect(result.removedCount).toBe(0);
    });

    it("should detect removed characters", () => {
      const oldText = "Hello World";
      const newText = "Hello";

      const result = calculateDiff(oldText, newText);

      expect(result.segments).toHaveLength(2);
      expect(result.segments[0]).toEqual({ type: "equal", value: "Hello" });
      expect(result.segments[1]).toEqual({ type: "remove", value: " World" });
      expect(result.addedCount).toBe(0);
      expect(result.removedCount).toBe(6);
    });

    it("should detect both added and removed characters", () => {
      const oldText = "Hello World";
      const newText = "Hello Qwik";

      const result = calculateDiff(oldText, newText);

      expect(result.segments.length).toBeGreaterThan(0);
      expect(result.addedCount).toBe(4);
      expect(result.removedCount).toBe(5);
    });

    it("should handle complete text replacement", () => {
      const oldText = "ABC";
      const newText = "XYZ";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(3);
      expect(result.removedCount).toBe(3);
    });

    it("should detect no changes when texts are identical", () => {
      const text = "Hello World";

      const result = calculateDiff(text, text);

      expect(result.segments).toHaveLength(1);
      expect(result.segments[0]).toEqual({ type: "equal", value: text });
      expect(result.addedCount).toBe(0);
      expect(result.removedCount).toBe(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty old text", () => {
      const oldText = "";
      const newText = "Hello";

      const result = calculateDiff(oldText, newText);

      expect(result.segments).toHaveLength(1);
      expect(result.segments[0]).toEqual({ type: "add", value: "Hello" });
      expect(result.addedCount).toBe(5);
      expect(result.removedCount).toBe(0);
    });

    it("should handle empty new text", () => {
      const oldText = "Hello";
      const newText = "";

      const result = calculateDiff(oldText, newText);

      expect(result.segments).toHaveLength(1);
      expect(result.segments[0]).toEqual({ type: "remove", value: "Hello" });
      expect(result.addedCount).toBe(0);
      expect(result.removedCount).toBe(5);
    });

    it("should handle both empty texts", () => {
      const oldText = "";
      const newText = "";

      const result = calculateDiff(oldText, newText);

      expect(result.segments).toHaveLength(0);
      expect(result.addedCount).toBe(0);
      expect(result.removedCount).toBe(0);
    });

    it("should handle single character changes", () => {
      const oldText = "a";
      const newText = "b";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(1);
      expect(result.removedCount).toBe(1);
    });
  });

  describe("Special Characters", () => {
    it("should handle newline characters", () => {
      const oldText = "Line 1\nLine 2";
      const newText = "Line 1\nLine 3";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(1);
      expect(result.removedCount).toBe(1);
    });

    it("should handle tab characters", () => {
      const oldText = "Hello\tWorld";
      const newText = "Hello\t\tWorld";

      const result = calculateDiff(oldText, newText);

      expect(result.segments.some((s) => s.type === "add" && s.value === "\t"))
        .toBe(true);
      expect(result.addedCount).toBe(1);
    });

    it("should handle special regex characters", () => {
      const oldText = "Hello [World]";
      const newText = "Hello (World)";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(2);
      expect(result.removedCount).toBe(2);
    });

    it("should handle unicode characters", () => {
      const oldText = "Hello 世界";
      const newText = "Hello 🌍";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBeGreaterThan(0);
      expect(result.removedCount).toBeGreaterThan(0);
    });
  });

  describe("Real-world Regex Replacement Scenarios", () => {
    it("should handle email extraction and replacement", () => {
      const oldText = "Contact: user@example.com";
      const newText = "Contact: [EMAIL]";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(7);
      expect(result.removedCount).toBe(16);
    });

    it("should handle URL replacement", () => {
      const oldText = "Visit https://example.com for more";
      const newText = "Visit [URL] for more";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(5);
      expect(result.removedCount).toBe(19);
    });

    it("should handle phone number redaction", () => {
      const oldText = "Call (555) 123-4567";
      const newText = "Call [PHONE]";

      const result = calculateDiff(oldText, newText);

      expect(
        result.segments.some((s) => s.type === "equal" && s.value === "Call "),
      ).toBe(true);
    });

    it("should handle HTML tag removal", () => {
      const oldText = "<div>content</div>";
      const newText = "content";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(0);
      expect(result.removedCount).toBe(11);
    });
  });

  describe("Performance and Large Text", () => {
    it("should handle moderately large text efficiently", () => {
      const oldText = "Lorem ipsum ".repeat(100);
      const newText = "Lorem ipsum dolor ".repeat(100);

      const startTime = performance.now();
      const result = calculateDiff(oldText, newText);
      const endTime = performance.now();

      expect(result.segments.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it("should handle text with many small changes", () => {
      const oldText = "a b c d e f g h i j";
      const newText = "a B c D e F g H i J";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(5);
      expect(result.removedCount).toBe(5);
    });
  });

  describe("Whitespace Handling", () => {
    it("should detect added spaces", () => {
      const oldText = "HelloWorld";
      const newText = "Hello World";

      const result = calculateDiff(oldText, newText);

      expect(result.addedCount).toBe(1);
      expect(result.segments.some((s) => s.type === "add" && s.value === " "))
        .toBe(true);
    });

    it("should detect removed spaces", () => {
      const oldText = "Hello  World";
      const newText = "Hello World";

      const result = calculateDiff(oldText, newText);

      expect(result.removedCount).toBe(1);
    });

    it("should handle leading and trailing whitespace changes", () => {
      const oldText = "  Hello  ";
      const newText = "Hello";

      const result = calculateDiff(oldText, newText);

      expect(result.removedCount).toBe(4);
    });
  });
});
