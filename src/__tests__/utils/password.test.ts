// __tests__/password.utils.test.ts
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { hashPassword, verifyPassword } from '../../utils/password.utils.js';

describe('Testing password utilities', () => {
    describe('Testing hashPassword()', () => {
        it('should generate a hash and a salt', () => {
            const password = 'mySecret123';
            const { hash, salt } = hashPassword(password);

            assert.ok(hash, 'Hash should be generated');
            assert.ok(salt, 'Salt should be generated');
            assert.strictEqual(hash.length, 128, 'Hash should be 64 bytes hex encoded (128 chars)');
            assert.strictEqual(salt.length, 32, 'Salt should be 16 bytes hex encoded (32 chars)');
        });

        it('should generate different hashes for same password (different salt)', () => {
            const password = 'samePassword';
            const result1 = hashPassword(password);
            const result2 = hashPassword(password);

            assert.notStrictEqual(result1.hash, result2.hash, 'Hashes should differ');
            assert.notStrictEqual(result1.salt, result2.salt, 'Salts should differ');
        });
    });

    describe('Testing verifyPassword()', () => {
        it('should return true for correct password and salt', () => {
            const password = 'verifyMe';
            const { hash, salt } = hashPassword(password);

            const valid = verifyPassword(password, hash, salt);
            assert.strictEqual(valid, true, 'Password verification should succeed');
        });

        it('should return false for incorrect password', () => {
            const password = 'correctPassword';
            const { hash, salt } = hashPassword(password);

            const valid = verifyPassword('wrongPassword', hash, salt);
            assert.strictEqual(valid, false, 'Password verification should fail');
        });

        it('should return false if salt is wrong', () => {
            const password = 'test123';
            const { hash } = hashPassword(password);
            const wrongSalt = 'abcd1234abcd1234abcd1234abcd1234'; // random 32 chars

            const valid = verifyPassword(password, hash, wrongSalt);
            assert.strictEqual(valid, false, 'Password verification should fail with wrong salt');
        });
    });
});
