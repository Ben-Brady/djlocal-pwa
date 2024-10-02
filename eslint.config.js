import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type { import("eslint").Linter.Config[] } */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                version: "detect", // React version. "detect" automatically picks the version you have installed.
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unknown-property": "off",
            "prefer-const": "off",
            "react/prop-types": "off",
        },
    },
];
