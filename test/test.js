const assert = require('assert');
const cccedict = require('../lib/parse-cc-cedict');

const defs = cccedict.parseFile('test/data/dict.txt');

assert.deepStrictEqual(
    defs[4],
    {
        simplified: '有理',
        traditional: '有理',
        pronunciation: 'you3 li3',
        definitions: [ 'reasonable', 'justified', 'right', '(math.) rational' ]
    });