# Text Pipeline Specific Processor WASM

[日本語版 / See Japanese version below](#日本語)

## English

### Overview

Rust-based WebAssembly module for processing escaped string sequences into
control characters. Enables efficient escape sequence handling (e.g., `\n`,
`\t`, `\r`, Unicode escapes) across Node.js, Deno, and browsers.

### Why Rust?

No existing JavaScript library matched my requirements for unescape sequence
processing. While implementing this independently in JavaScript is possible, it
falls outside the core focus of this project. Rust provides the most advanced
WASI support and offers memory safety, performance, and access to the proven
`unescape` crate parser library.

### Quick Start

Prerequisites: Rust toolchain and `wasm-pack`

```bash
# Install wasm-pack
cargo install wasm-pack

# Run tests
cargo test

# Build for Node.js/Deno
wasm-pack build --target nodejs

# Build for bundlers (Webpack/Vite)
wasm-pack build --target bundler

# Build for browsers
wasm-pack build --target web
```

Output generated in `pkg/`:

- `text_pipline_specific_processor_wasm_bg.wasm` - Binary
- `text_pipline_specific_processor_wasm.js` - Bindings
- `text_pipline_specific_processor_wasm.d.ts` - TypeScript types

### Usage

```typescript
import init, { unescape_string } from "./pkg/index.js";

await init();

const result = unescape_string("Hello\\nWorld\\tTab");
console.log(result); // Hello\nWorld\tTab (with actual control characters)
```

---

## 日本語

### 概要

エスケープされた文字列シーケンスを制御文字に変換するRust製WebAssemblyモジュール。Node.js、Deno、ブラウザ環境で効率的なエスケープシーケンス処理を実現します。

### なぜRustか？

JavaScriptでのエスケープシーケンス処理に関して、私の要求を満たすライブラリが見当たりませんでした。JavaScript独自実装も可能ですが、それは本プロジェクトの本質ではありません。Rustは最も先進的なWASIサポートを提供し、メモリ安全性、パフォーマンス、そして実績のある`unescape`クレートパーサライブラリの恩恵を受けることができます。

### クイックスタート

前提条件：Rustツールチェーンと`wasm-pack`

```bash
# wasm-packをインストール
cargo install wasm-pack

# テスト実行
cargo test

# Node.js/Deno用ビルド
wasm-pack build --target nodejs

# バンドラー用（Webpack/Vite）
wasm-pack build --target bundler

# ブラウザ用
wasm-pack build --target web
```

`pkg/`に生成されるファイル：

- `text_pipline_specific_processor_wasm_bg.wasm` - バイナリ
- `text_pipline_specific_processor_wasm.js` - バインディング
- `text_pipline_specific_processor_wasm.d.ts` - TypeScript型定義

### 使用方法

```typescript
import init, { unescape_string } from "./pkg/index.js";

await init();

const result = unescape_string("Hello\\nWorld\\tTab");
console.log(result); // Hello\nWorld\tTab（実際の制御文字付き）
```
