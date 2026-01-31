module.exports = {
  root: true,
  extends: ["universe/native"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};
