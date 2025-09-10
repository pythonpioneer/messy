// __tests__/decFile.test.ts
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import encFile from '../../utils/encFile.utils.js';
import decFile from '../../utils/decFile.utils.js';

// 👇 ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DIR = path.resolve(__dirname, 'test-dec');
const PASSWORD = 'mypassword';

beforeEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DIR);
});

afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('Testing decFile() utility', () => {
    it('should decrypt an encrypted file back to original', () => {
        const filePath = path.join(TEST_DIR, 'secret.txt');
        const content = 'my secret data';
        fs.writeFileSync(filePath, content);

        encFile(TEST_DIR, PASSWORD);

        const encryptedFile = filePath + '.hrk';
        assert.ok(fs.existsSync(encryptedFile), 'Encrypted file not created');

        decFile(TEST_DIR, PASSWORD);

        assert.ok(fs.existsSync(filePath), 'Decrypted file not restored');
        const decryptedContent = fs.readFileSync(filePath, 'utf-8');
        assert.strictEqual(decryptedContent, content, 'Decrypted content mismatch');
        assert.ok(!fs.existsSync(encryptedFile), 'Encrypted file not removed after decryption');
    });

    it('should skip non-.hrk files', () => {
        const normalFile = path.join(TEST_DIR, 'note.txt');
        fs.writeFileSync(normalFile, 'plain text');

        decFile(TEST_DIR, PASSWORD);

        assert.ok(fs.existsSync(normalFile), 'Non-.hrk file should remain untouched');
    });

    it('should skip .wizard metadata files', () => {
        const wizardFile = path.join(TEST_DIR, 'meta.wizard');
        fs.writeFileSync(wizardFile, 'metadata');

        decFile(TEST_DIR, PASSWORD);

        assert.ok(fs.existsSync(wizardFile), '.wizard file should remain untouched');
    });

    it('should decrypt files inside subdirectories', () => {
        const subDir = path.join(TEST_DIR, 'nested');
        fs.mkdirSync(subDir);

        const nestedFile = path.join(subDir, 'nested.txt');
        const content = 'nested secret';
        fs.writeFileSync(nestedFile, content);

        encFile(TEST_DIR, PASSWORD);

        const encryptedFile = nestedFile + '.hrk';
        assert.ok(fs.existsSync(encryptedFile), 'Encrypted file in subdir not created');

        decFile(TEST_DIR, PASSWORD);

        assert.ok(fs.existsSync(nestedFile), 'Decrypted file in subdir not restored');
        const decryptedContent = fs.readFileSync(nestedFile, 'utf-8');
        assert.strictEqual(decryptedContent, content, 'Decrypted content mismatch in subdir');
        assert.ok(!fs.existsSync(encryptedFile), 'Encrypted file in subdir not removed');
    });

    it('should throw error if directory does not exist', () => {
        const missingDir = path.join(TEST_DIR, 'ghost');
        assert.throws(() => {
            decFile(missingDir, PASSWORD);
        }, /does not exist/);
    });

    it('should throw error if path is not a directory', () => {
        const filePath = path.join(TEST_DIR, 'file.txt');
        fs.writeFileSync(filePath, 'data');
        assert.throws(() => {
            decFile(filePath, PASSWORD);
        }, /is not a directory/);
    });

    it('should throw error if .hrk file is corrupted', () => {
        const corruptedFile = path.join(TEST_DIR, 'bad.txt.hrk');
        fs.writeFileSync(corruptedFile, Buffer.from('1234567890'));

        assert.throws(() => {
            decFile(TEST_DIR, PASSWORD);
        }, /bad decrypt|invalid/i);
    });
});
