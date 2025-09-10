import { describe, it } from 'node:test';
import assert from 'node:assert';
import getKey from '../../utils/getKey.utils.js';

describe('Testing getKey() utility', () => {
    it('should return a 32-byte key', () => {
        const key = getKey('aa');
        assert.strictEqual(key.length, 32);
    });
});
