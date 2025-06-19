import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/*"],
    format: ["esm", "cjs"],
    splitting: false,
    sourcemap: true,
    minify: true,
    dts: true,
    skipNodeModulesBundle: true,
    external: ["node_modules"],
  },
]);
