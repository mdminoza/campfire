const {
  removeModuleScopePlugin,
  override,
  babelInclude,
  addBabelPlugin,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('customize-cra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = override(
  addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
  addBabelPlugin('@babel/plugin-proposal-nullish-coalescing-operator'),
  removeModuleScopePlugin(),
  babelInclude([path.resolve('src'), path.resolve('shared')]),
);
