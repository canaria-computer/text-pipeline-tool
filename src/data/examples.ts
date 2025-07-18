import type { PipelineStage } from "~/types/pipeline";

export interface TextProcessingExample {
  id: string;
  name: string;
  description: string;
  inputText: string;
  stages: PipelineStage[];
}

export const textProcessingExamples: TextProcessingExample[] = [
  {
    id: "data-extraction",
    name: "Data Extraction",
    description: "Extract emails, URLs, and phone numbers from text",
    inputText: `Hello World! This is a sample text for processing.
Visit https://example.com and contact us at support@example.com.
Phone numbers: (555) 123-4567 and +1-800-555-0199.
Some HTML tags: <div>content</div> and <span class="highlight">text</span>.`,
    stages: [
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
      {
        id: "url-stage",
        name: "Extract URLs",
        pattern: "https?://[^\\s]+",
        replacement: "[URL]",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "phone-stage",
        name: "Extract Phone Numbers",
        pattern: "\\+?1?[-.]?\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}",
        replacement: "[PHONE]",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
    ],
  },
  {
    id: "text-formatting",
    name: "Text Formatting",
    description: "Format and clean up text with multiple transformations",
    inputText: `This  is   some    POORLY formatted    text.
it has INCONSISTENT spacing and CAPITALization.
remove-dashes and_underscores from words.
Also normalize "quotes" and 'apostrophes'.`,
    stages: [
      {
        id: "normalize-spaces",
        name: "Normalize Spaces",
        pattern: "\\s+",
        replacement: " ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "lowercase",
        name: "Convert to Lowercase",
        pattern: "[A-Z]",
        replacement: "$&",
        caseSensitive: true,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "remove-dashes",
        name: "Remove Dashes and Underscores",
        pattern: "[-_]",
        replacement: " ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
      {
        id: "normalize-quotes",
        name: "Normalize Quotes",
        pattern: `[""'']`,
        replacement: '"',
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 3,
      },
    ],
  },
  {
    id: "html-cleanup",
    name: "HTML Cleanup",
    description: "Remove HTML tags and decode entities",
    inputText: `<div class="content">
  <h1>Welcome to our &lt;website&gt;</h1>
  <p>This is a <strong>sample</strong> HTML content with &amp; entities.</p>
  <a href="https://example.com">Visit our website</a>
  <br/>
  <img src="image.jpg" alt="Sample image" />
</div>`,
    stages: [
      {
        id: "remove-html-tags",
        name: "Remove HTML Tags",
        pattern: "<[^>]*>",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "decode-lt",
        name: "Decode &lt; entities",
        pattern: "&lt;",
        replacement: "<",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 1,
      },
      {
        id: "decode-gt",
        name: "Decode &gt; entities",
        pattern: "&gt;",
        replacement: ">",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 2,
      },
      {
        id: "decode-amp",
        name: "Decode &amp; entities",
        pattern: "&amp;",
        replacement: "&",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 3,
      },
      {
        id: "clean-whitespace",
        name: "Clean Extra Whitespace",
        pattern: "\\s+",
        replacement: " ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 4,
      },
    ],
  },
];

export const getExampleById = (
  id: string,
): TextProcessingExample | undefined => {
  return textProcessingExamples.find((example) => example.id === id);
};

export const getDefaultExample = (): TextProcessingExample => {
  return textProcessingExamples[0];
};
