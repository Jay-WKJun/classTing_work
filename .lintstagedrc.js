// lint-staged
// https://www.npmjs.com/package/lint-staged

// lint-staged config
// https://www.npmjs.com/package/lint-staged#Configuration

// micromatch -> path matching system in lint-staged
// https://github.com/micromatch/micromatch

module.exports = {
  "src/**.js*(x)": "eslint",
  "src/**.ts*(x)": "eslint",
  "src/**.*(s)css": "stylelint",
  "src/**.*(module).*(s)css": "stylelint",
};
