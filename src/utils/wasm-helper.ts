import { isBrowser } from "@builder.io/qwik/build";

let wasmInitialized = false;
let unescapeStringFn: ((input: string) => string) | null = null;

export async function initWasm(): Promise<void> {
  if (!isBrowser) {
    return;
  }

  if (wasmInitialized) {
    return;
  }

  try {
    const wasm = await import("@pipeline-specific/wasm-processor");
    await wasm.default();
    unescapeStringFn = wasm.unescape_string;
    wasmInitialized = true;
  } catch (error) {
    console.error("Failed to initialize WASM module:", error);
    wasmInitialized = false;
  }
}

export function unescapeString(input: string): string {
  if (!isBrowser || !wasmInitialized || !unescapeStringFn) {
    return input;
  }

  try {
    return unescapeStringFn(input);
  } catch (error) {
    console.error("WASM unescape_string error:", error);
    return input;
  }
}

export function isWasmReady(): boolean {
  return isBrowser && wasmInitialized;
}
