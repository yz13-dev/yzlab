import type { OptionsExport } from "@orval/core";
import { defineConfig } from "orval";

export const gfkOrvalConfig: OptionsExport = {
  input: {
    target: "./api.json",
  },
  output: {
    baseUrl: "https://api.yzlab.ru",
    httpClient: "axios",
    mode: "split",
    target: "./src/api",
    schemas: "./src/types",
    client: "axios-functions",
    mock: false,
    clean: true,
    namingConvention: "kebab-case",
    override: {
      zod: {
        generate: {
          response: true,
          query: true,
          body: true,
          param: true,
          header: true
        }
      },
      // mutator: {
      //   path: "./custom-fetch.tsx",
      //   name: "customFetch",
      // },
    },
  },
};

export default defineConfig({
  gfk: {
    ...gfkOrvalConfig,
    // hooks: {
    //   afterAllFilesWrite:
    //     'eslint --fix ./api/generated/endpoints --rule "check-file/filename-naming-convention: 0" --rule "import/no-restricted-paths: 0"',
    // },
  },
});
