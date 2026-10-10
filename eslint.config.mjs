import magicNumbers from "@piro0919/eslint-config";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["**/out/", "**/dist/", "**/*.d.ts"]),
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/naming-convention": "warn",
      // typescript-eslint 8 で @typescript-eslint/semi が無くなり、@stylistic に移った
      "@stylistic/semi": "warn",
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "off",
    },
  },
  ...magicNumbers({ files: ["**/*.ts"] }),
]);
