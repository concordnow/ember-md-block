'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let app = this._findHost();
      let mdBlockOptions = Object.assign(
        {},
        {
          blockRegexes: {
            begin: /\bMD-BLOCK\b/,
            end: /\bMD-BLOCK\b/,
          },
          wrapper: { begin: '', end: '' },
        },
        app.options
      );
      let TemplateCompiler = require('./lib/md-block-compiler');
      registry.add('template', new TemplateCompiler(mdBlockOptions));
    }
  },
};
