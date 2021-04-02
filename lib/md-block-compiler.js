'use strict';

const stew = require('broccoli-stew');
const compileMarkdown = require('./compile-markdown');

module.exports = class MdBlockCompiler {
  constructor(options) {
    this.name = 'md-block-compiler';
    this.options = options || {};
  }

  toTree(tree) {
    let compiled = stew.map(tree, `**/*.hbs`, (content, relativePath) =>
      compileMarkdown(content, this.options, relativePath)
    );

    return compiled;
  }
};
