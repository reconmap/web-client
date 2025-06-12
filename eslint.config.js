const { defineConfig, globalIgnores } = require("eslint/config");

const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

const reactHooks = require("eslint-plugin-react-hooks");
const globals = require("globals");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

module.exports = defineConfig([
    {
        extends: fixupConfigRules(
            compat.extends(
                "eslint:recommended",
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:import/recommended",
                "plugin:jsx-a11y/recommended",
                "plugin:@typescript-eslint/recommended",
                "eslint-config-prettier",
            ),
        ),

        plugins: {
            "react-hooks": fixupPluginRules(reactHooks),
        },

        settings: {
            react: {
                version: "detect",
            },

            "import/resolver": {
                node: {
                    paths: ["src"],
                    extensions: [".js", ".jsx", ".ts"],
                },
            },
        },

        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unsafe-function-type": "warn",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "import/no-anonymous-default-export": "warn",
            "import/no-unresolved": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
            "no-prototype-builtins": "error",
            "no-undef": "warn",
            "no-unused-vars": "warn",
            "prefer-const": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "warn",
            "react/display-name": "warn",
            "react/jsx-key": "warn",
            "react/prop-types": "warn",
            "react/react-in-jsx-scope": "warn",
            eqeqeq: "warn",
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    globalIgnores(["**/node_modules", "**/build", "packages/app/coverage**"]),
]);
