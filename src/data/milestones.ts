export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  features?: string[];
  date?: string;
  completed: boolean;
  githubUrl?: string;
}

export const milestones: MilestoneItem[] = [
  {
    id: "alpha-release",
    title: "Alpha Release v0.1.0",
    description:
      "Initial alpha release with core text processing pipeline functionality.",
    features: [
      "Multi-stage text transformation with regex",
      "Drag-and-drop stage reordering",
      "Real-time preview with step-by-step results",
      "Dark mode support",
      "Character-level diff visualization",
    ],
    date: "2025-11",
    completed: true,
    // githubUrl: "https://github.com/canaria-computer/text-pipeline-tool",
  },
  {
    id: "diff-visualization",
    title: "Diff Visualization Feature",
    description:
      "Added Git-style character-level diff display for each processing step.",
    features: [
      "Character-level diff calculation using jsdiff",
      "Toggle ON/OFF for diff view",
      "Addition/deletion highlighting",
      "Statistics (added/removed characters)",
    ],
    date: "2025-11",
    completed: true,
  },
  {
    id: "accessibility-improvements",
    title: "Accessibility & UX Improvements",
    description:
      "Enhanced keyboard navigation and visual feedback for drag-and-drop.",
    features: [
      "Up/Down buttons for keyboard-based stage reordering",
      "Visual feedback during drag operations",
      "Stable unique IDs with Nano ID",
      "Improved drag target highlighting",
    ],
    date: "2025-11",
    completed: true,
  },
  {
    id: "public-release",
    title: "Public Beta Release v0.2.0",
    description: "First public release with stable features and documentation.",
    features: [
      "Complete documentation",
      "Example templates library",
      "Performance optimizations",
      "Bug fixes and stability improvements",
    ],
    date: "2026-Q1 (Planned)",
    completed: false,
  },
  {
    id: "indexeddb",
    title: "IndexedDB Support",
    description:
      "Local storage support for saving and restoring pipeline configurations.",
    features: [
      "Save pipeline configurations locally",
      "Auto-save functionality",
      "Load saved configurations",
      "Configuration management UI",
    ],
    date: "2026-Q1 (Planned)",
    completed: false,
  },
  {
    id: "export-import",
    title: "Configuration Export/Import",
    description:
      "Export and import pipeline configurations as JSON/YAML files.",
    features: [
      "JSON/YAML schema definition",
      "Export configurations to files",
      "Import from files",
      "Configuration validation",
      "Version compatibility checking",
    ],
    date: "2026-Q2 (Planned)",
    completed: false,
  },
  {
    id: "regex-sharing",
    title: "Regex Pattern Sharing",
    description:
      "Community-driven library of useful regex patterns and pipeline templates.",
    features: [
      "Browse community patterns",
      "Share your patterns",
      "Rating and comments system",
      "Search and filter patterns",
      "One-click import",
    ],
    date: "2026-Q2 (Planned)",
    completed: false,
  },
  {
    id: "code-generation",
    title: "Code Generation",
    description:
      "Convert pipeline configurations to code in multiple programming languages.",
    features: [
      "Python code generation",
      "JavaScript/TypeScript generation",
      "Java code generation",
      "C/C++ code generation",
      "Rust code generation",
      "Go code generation",
      "Copy to clipboard functionality",
    ],
    date: "2026-Q3 (Planned)",
    completed: false,
  },
  {
    id: "file-upload",
    title: "File Upload Support",
    description: "Process text-based files directly in the pipeline.",
    features: [
      "JSON file support",
      "YAML file support",
      "Plain text (.txt) support",
      "Log file (.log) support",
      "CSV file support",
      "Drag-and-drop file upload",
      "Large file handling",
    ],
    date: "2026-Q3 (Planned)",
    completed: false,
  },
];
