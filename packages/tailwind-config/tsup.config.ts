import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/globals.css", "src/theme.css", "src/vars.css"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  skipNodeModulesBundle: true,
  dts: true,
  external: ["node_modules"],
});
