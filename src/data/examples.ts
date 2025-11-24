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
  {
    id: "log-parsing",
    name: "Log File Parsing",
    description: "Extract and format structured data from application logs",
    inputText: `[2024-03-15 14:32:01] ERROR: Failed to connect to database
[2024-03-15 14:32:05] WARNING: Retry attempt 1/3
[2024-03-15 14:32:10] INFO: Connection established successfully


[2024-03-15 14:32:15] DEBUG: Query executed in 0.125ms
[2024-03-15 14:33:00] ERROR: Timeout exception in module auth.login`,
    stages: [
      {
        id: "extract-timestamp",
        name: "Extract Timestamp",
        pattern: "\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\]",
        replacement: "Time: $1 |",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "highlight-errors",
        name: "Highlight ERROR level",
        pattern: "ERROR:",
        replacement: "⚠️ ERROR:",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 1,
      },
      {
        id: "remove-debug",
        name: "Remove DEBUG entries",
        pattern: "Time:.*?DEBUG:.*?\\n",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
      {
        id: "clean-lines",
        name: "Clean Empty Lines",
        pattern: "\\n\\n+",
        replacement: "\\n",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 3,
      },
    ],
  },
  {
    id: "markdown-to-plain",
    name: "Markdown to Plain Text",
    description: "Convert markdown formatting to readable plain text",
    inputText: `# Main Title

## Section 1
This is **bold text** and this is *italic text*.

- Item 1
- Item 2
- Item 3

[Link text](https://example.com)

\`\`\`javascript
const code = "example";
\`\`\`

> This is a blockquote`,
    stages: [
      {
        id: "remove-code-blocks",
        name: "Remove Code Blocks",
        pattern: "```[\\s\\S]*?```",
        replacement: "[CODE BLOCK]",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "headers",
        name: "Convert Headers",
        pattern: "^#{1,6}\\s+",
        replacement: "■ ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "bold",
        name: "Remove Bold Markers",
        pattern: "\\*\\*([^*]+)\\*\\*",
        replacement: "$1",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
      {
        id: "italic",
        name: "Remove Italic Markers",
        pattern: "\\*([^*]+)\\*",
        replacement: "$1",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 3,
      },
      {
        id: "links",
        name: "Extract Link URLs",
        pattern: "\\[([^\\]]+)\\]\\(([^)]+)\\)",
        replacement: "$1 ($2)",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 4,
      },
      {
        id: "list-items",
        name: "Format List Items",
        pattern: "^[-*]\\s+",
        replacement: "  • ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 5,
      },
      {
        id: "blockquote",
        name: "Format Blockquotes",
        pattern: "^>\\s+",
        replacement: "❝ ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 6,
      },
    ],
  },
  {
    id: "csv-to-table",
    name: "CSV to Readable Format",
    description: "Transform CSV data into a more readable format",
    inputText: `name,age,email,city
John Doe,28,john@example.com,New York
Jane Smith,34,jane@example.com,Los Angeles
Bob Johnson,45,bob@example.com,Chicago`,
    stages: [
      {
        id: "header-separator",
        name: "Add Header Separator",
        pattern: "\\n",
        replacement: "\\n---\\n",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 0,
      },
      {
        id: "remove-extra-separator",
        name: "Remove Extra Separators",
        pattern: "(---\\n){2,}",
        replacement: "---\\n",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "comma-to-pipe",
        name: "Convert Commas to Pipes",
        pattern: ",",
        replacement: " | ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 2,
      },
    ],
  },
  {
    id: "json-cleanup",
    name: "JSON Data Extraction",
    description: "Extract values from JSON and format as readable text",
    inputText:
      `{"users":[{"id":1,"name":"Alice","status":"active"},{"id":2,"name":"Bob","status":"inactive"},{"id":3,"name":"Charlie","status":"active"}],"timestamp":"2024-03-15T10:30:00Z"}`,
    stages: [
      {
        id: "remove-braces",
        name: "Remove Structural Characters",
        pattern: "[{}\\[\\]]",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "key-value-format",
        name: "Format Key-Value Pairs",
        pattern: '"([^"]+)":',
        replacement: "\\n$1: ",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "remove-quotes",
        name: "Remove Quotes",
        pattern: '"',
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 2,
      },
      {
        id: "clean-commas",
        name: "Clean Commas",
        pattern: ",",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: false,
        enabled: true,
        order: 3,
      },
      {
        id: "clean-whitespace",
        name: "Clean Extra Whitespace",
        pattern: "\\n\\n+",
        replacement: "\\n",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 4,
      },
    ],
  },
  {
    id: "code-comment-removal",
    name: "Code Comment Removal",
    description: "Remove comments from code while preserving structure",
    inputText: `// This is a single line comment
function example() {
  /* Multi-line comment
     spanning multiple lines */
  const value = 42; // inline comment
  return value;
}
/* Another block comment */`,
    stages: [
      {
        id: "remove-single-line",
        name: "Remove Single Line Comments",
        pattern: "//.*",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "remove-multi-line",
        name: "Remove Multi-line Comments",
        pattern: "/\\*[\\s\\S]*?\\*/",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
      },
      {
        id: "clean-empty-lines",
        name: "Clean Empty Lines",
        pattern: "^\\s*\\n",
        replacement: "",
        caseSensitive: false,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 2,
      },
    ],
  },
  {
    id: "variable-name-converter",
    name: "Variable Name Converter",
    description:
      "Convert variable naming conventions (camelCase to snake_case)",
    inputText: `const userFirstName = "John";
const userLastName = "Doe";
const userEmailAddress = "john@example.com";
const isUserActive = true;
const maxRetryCount = 3;`,
    stages: [
      {
        id: "camel-to-snake",
        name: "Convert camelCase to snake_case",
        pattern: "([a-z])([A-Z])",
        replacement: "$1_$2",
        caseSensitive: true,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 0,
      },
      {
        id: "lowercase-all",
        name: "Convert to Lowercase",
        pattern: "([A-Z])",
        replacement: "$1",
        caseSensitive: true,
        wordBoundary: false,
        useRegex: true,
        enabled: true,
        order: 1,
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
