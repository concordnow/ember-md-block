import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application render', function (hooks) {
  setupApplicationTest(hooks);

  test('rendering a markdown template', async function (assert) {
    await visit('/');

    assert.equal(
      this.element.querySelector('[data-test="md-block"]').innerHTML,
      `
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

`
    );
  });
});
