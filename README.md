# ember-md-block

[![Build Status](https://github.com/concordnow/ember-md-block/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/concordnow/ember-md-block/actions/workflows/main.yml)

Insert markdown blocks in your template files.
They will be compiled into html at build time.

## Compatibility

- Ember.js v3.16 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-md-block
```

## Usage

```handlebars
{{page-title "Dummy"}}

{{! MD-BLOCK }}
# Hello

| Header  | Another header |
|---------|----------------|
| field 1 | something      |
| field 2 | something else |

{{! MD-BLOCK }}

```

will be compiled to

```handlebars
{{page-title "Dummy"}}

<h1><a id="hello" class="anchor" aria-hidden="true" href="#hello"></a>Hello</h1>
<table>
  <thead>
    <tr>
      <th>Header</th>
      <th>Another header</th>
    </tr>
    </thead>
  <tbody>
    <tr>
      <td>field 1</td>
      <td>something</td>
    </tr>
    <tr>
      <td>field 2</td>
      <td>something else</td>
    </tr>
  </tbody>
</table>
```

## Configuration

Configuration options can be placed in your `config/environment.js` under the `'ember-md-block'` key.

### Custom block delimiters

You can define your own regex to find markdown blocks. Just use the `blockRegexes` option:

```javascript
ENV['ember-md-block'] = {
  blockRegexes: {
    begin: /\CUSTOM-BLOCK\b/,
    end: /\CUSTOM-BLOCK\b/,
  },
};
```

### Custom block wapper

You can also define your block wrapper own regex to find markdown blocks. Just use the `blockRegexes` option:

```javascript
ENV['ember-md-block'] = {
  wrapper: {
    begin: '<div class="markdown">\n',
    end: '</div>\n',
  },
};
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Thanks

- [markdown-wasm](https://github.com/rsms/markdown-wasm)

## License

This project is licensed under the [MIT License](LICENSE.md).
