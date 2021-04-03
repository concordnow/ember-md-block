'use strict';

const DEFAULT_OPTIONS = {
  blockRegexes: {
    begin: /\bMD-BLOCK\b/,
    end: /\bMD-BLOCK\b/,
  },
  wrapper: { begin: '', end: '' },
};

module.exports = {
  name: require('./package').name,

  mdBlockOptions: function () {
    let app = this._findHost();
    let options = Object.assign(
      {},
      DEFAULT_OPTIONS,
      app && app.options && app.options['ember-md-block']
    );

    return options;
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      let htmlbarsPlugin = registry.load('template').find(function (plugin) {
        return plugin.name === 'ember-cli-htmlbars';
      });
      registry.remove('template', htmlbarsPlugin);
      // We need to be applied before ember-cli-htmlbars
      let TemplateCompiler = require('./lib/md-block-compiler');
      registry.add(
        'template',
        new TemplateCompiler(this.mdBlockOptions.bind(this))
      );
      registry.add('template', htmlbarsPlugin);
    }
  },
};
