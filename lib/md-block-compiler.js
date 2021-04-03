'use strict';

const stew = require('broccoli-stew');
const compileMarkdown = require('./compile-markdown');

module.exports = class MdBlockCompiler {
  constructor(optionsFn) {
    this.name = 'md-block-compiler';
    this.optionsFn = optionsFn;
  }

  toTree(tree, inputPath, outputPath, inputOptions) {
    let options = Object.assign({}, this.optionsFn(), inputOptions);
    let compiled = stew.map(tree, `**/*.hbs`, (content, relativePath) => {
      return compileMarkdown(content, options, relativePath);
    });

    return compiled;
  }
};
