/*global QUnit*/
const compileMarkdown = require('../compile-markdown.js');

const DEFAULT_OPTIONS = {
  blockRegexes: {
    begin: /\bMD-BLOCK\b/,
    end: /\bMD-BLOCK\b/,
  },
  wrapper: {
    begin: '',
    end: '',
  },
};

QUnit.module('compileMarkdown');

QUnit.test('render raw hbs', (assert) => {
  let input = `
<div>foo</div>
<MyComponent @attr="bar"></MyComponent>
`;

  let output = `
<div>foo</div>
<MyComponent @attr="bar"></MyComponent>
`;
  assert.equal(compileMarkdown(input, DEFAULT_OPTIONS), output);
});

QUnit.test('render markdown in hbs', (assert) => {
  let input = `
<div>foo</div>

{{! MD-BLOCK }}
# Hello
{{! MD-BLOCK }}

<MyComponent @attr="bar"></MyComponent>
`;

  let output = `
<div>foo</div>

<h1><a id="hello" class="anchor" aria-hidden="true" href="#hello"></a>Hello</h1>


<MyComponent @attr="bar"></MyComponent>
`;
  assert.equal(compileMarkdown(input, DEFAULT_OPTIONS), output);
});

QUnit.test('render markdown with wrapper in hbs', (assert) => {
  let input = `
<div>foo</div>

{{! MD-BLOCK }}
# Hello
{{! MD-BLOCK }}

<MyComponent @attr="bar"></MyComponent>
`;

  let output = `
<div>foo</div>

<div class="baz">
<h1><a id="hello" class="anchor" aria-hidden="true" href="#hello"></a>Hello</h1>
</div>


<MyComponent @attr="bar"></MyComponent>
`;
  assert.equal(
    compileMarkdown(
      input,
      Object.assign({}, DEFAULT_OPTIONS, {
        wrapper: { begin: '<div class="baz">\n', end: '</div>\n' },
      })
    ),
    output
  );
});

QUnit.test('render markdown in hbs with custom block', (assert) => {
  let input = `
<div>foo</div>

{{! CUSTOM-BLOCK }}
# Hello
{{! CUSTOM-BLOCK }}

<MyComponent @attr="bar"></MyComponent>
`;

  let output = `
<div>foo</div>

<h1><a id="hello" class="anchor" aria-hidden="true" href="#hello"></a>Hello</h1>


<MyComponent @attr="bar"></MyComponent>
`;
  assert.equal(
    compileMarkdown(
      input,
      Object.assign({}, DEFAULT_OPTIONS, {
        blockRegexes: {
          begin: /\bCUSTOM-BLOCK\b/,
          end: /\bCUSTOM-BLOCK\b/,
        },
      })
    ),
    output
  );
});

QUnit.test('render multiple markdown blocks in hbs', (assert) => {
  let input = `
<div>foo</div>

{{! MD-BLOCK }}
# Hello
{{! MD-BLOCK }}

<MyComponent @attr="bar"></MyComponent>

{{! MD-BLOCK }}
# World
{{! MD-BLOCK }}
`;

  let output = `
<div>foo</div>

<h1><a id="hello" class="anchor" aria-hidden="true" href="#hello"></a>Hello</h1>


<MyComponent @attr="bar"></MyComponent>

<h1><a id="world" class="anchor" aria-hidden="true" href="#world"></a>World</h1>

`;
  assert.equal(compileMarkdown(input, DEFAULT_OPTIONS), output);
});

QUnit.test('throws error on uneven markdown block', (assert) => {
  let input = `
<div>foo</div>

{{! MD-BLOCK }}
# Hello
{{! MD-BLOCK }}

<MyComponent @attr="bar"></MyComponent>

{{! MD-BLOCK }}
# World
`;
  let relativePath = './foo/bar';

  assert.throws(
    function () {
      compileMarkdown(input, DEFAULT_OPTIONS, relativePath);
    },
    function (err) {
      return err.toString().includes(relativePath);
    }
  );
});
