import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/globals.css", "src/theme.css", "src/vars.css"],
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  skipNodeModulesBundle: true,
  dts: false,
  external: ["node_modules"],
});
