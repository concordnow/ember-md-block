const markdown = require('markdown-wasm');

module.exports = function compileMarkdown(content, options, relativePath) {
  let regexes = options.blockRegexes;
  let wrapper = options.wrapper;
  let result = [];
  let block = [];

  let hasOpenBlock = false;
  for (const line of content.split('\n')) {
    if (hasOpenBlock) {
      if (regexes.end.test(line)) {
        result = [
          ...result,
          `${wrapper.begin}${markdown.parse(block.join('\n'))}${wrapper.end}`,
        ];
        block = [];
        hasOpenBlock = false;
      } else {
        block.push(line);
      }
      continue;
    }
    if (regexes.begin.test(line)) {
      hasOpenBlock = true;
      continue;
    }
    result.push(line);
  }

  if (hasOpenBlock) {
    throw `Compilation failed: Unmatched md-block in ${relativePath}`;
  }

  return result.join('\n');
};
