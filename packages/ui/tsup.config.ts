import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: [
      "./src/globals.css",
    ],
    splitting: false,
    sourcemap: true,
    minify: true,
    dts: false,
    skipNodeModulesBundle: true,
    external: ["node_modules"],
  },
  {
    entry: [
      "./src/components/**/*",
      "./src/hooks/*",
      "./src/lib/*",
    ],
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    dts: true,
    external: ["node_modules"],
  }
]);
