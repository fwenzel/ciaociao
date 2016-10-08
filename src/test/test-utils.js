const utils = require('../lib/utils');

exports['test deEscapify'] = function(assert) {
  assert.ok(utils.deEscapify('My\\032name.') === 'My name.', 'One escape ok.');
  assert.ok(utils.deEscapify('My\\032awesome\\032printer') === 'My awesome printer',
            'All escapes are decoded.');
  assert.ok(utils.deEscapify('') === '', 'Empty string works.');
  assert.ok(utils.deEscapify('Hello hello') === 'Hello hello',
            'Nothing to escape is ok.');
  assert.ok(utils.deEscapify('Let\\039s\\045go') === "Let's-go",
            'Escaping non-spaces is fine.');
}

require('sdk/test').run(exports)
