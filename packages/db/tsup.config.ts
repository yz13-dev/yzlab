import { readdirSync, statSync } from "fs";
import { join } from "path";
import { defineConfig } from "tsup";

const getEntries = () => {
  const initialPath = join("./", "src");
  const result: string[] = [];

  const exploreDirectory = (path: string) => {
    const entries = readdirSync(path);
    entries.forEach((entry) => {
      const fullPath = join(path, entry);
      // const isTest = fullPath.endsWith(".test.ts")
      if (statSync(fullPath).isDirectory()) {
        exploreDirectory(fullPath);
      } else {
        result.push(fullPath);
      }
    });
  };

  exploreDirectory(initialPath);
  // console.log(result);
  return result;
};

export default defineConfig({
  entry: getEntries(),
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  skipNodeModulesBundle: true,
  dts: true,
  external: ["node_modules"],
});
