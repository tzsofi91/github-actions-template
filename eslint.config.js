const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.node,
        },
        rules: {
            eqeqeq: "error",
            "no-var": "error",
            "prefer-const": "error",
        },
    },
];