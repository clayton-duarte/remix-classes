module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "import/exports-last": ["error"],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "padding-line-between-statements": [
      "warn",
      // Adds a blank line between any statement
      {
        blankLine: "always",
        prev: "*",
        next: "*",
      },
      // Removes blank lines between variable definitions to group them
      {
        blankLine: "never",
        prev: ["singleline-const", "singleline-let", "singleline-var"],
        next: ["singleline-const", "singleline-let", "singleline-var"],
      },
      // Adds a blank line around arrow functions
      { blankLine: "always", prev: "block-like", next: "*" },
      { blankLine: "always", prev: "*", next: "block-like" },
      // Allows any number of lines between import statements, "import/order" rule takes care of it
      { blankLine: "any", prev: "import", next: "import" },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index", "object"],
          ["unknown"],
        ],
        pathGroups: [
          // React imports comes first
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          // Internal symlinks have priority
          {
            pattern: "~**/**",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
