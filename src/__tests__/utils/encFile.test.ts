// __tests__/encFile.test.ts
import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import encFile from '../../utils/encFile.utils.js';

// 👇 restore __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_DIR = path.resolve(__dirname, 'test-enc');
const PASSWORD = 'mypassword';

beforeEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DIR);
});

afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
});

describe('Testing encFile() utility', () => {
    it('should encrypt a file and replace it with .hrk', () => {
        const filePath = path.join(TEST_DIR, 'plain.txt');
        const content = 'secret text';
        fs.writeFileSync(filePath, content);

        encFile(TEST_DIR, PASSWORD);

        const encryptedFile = filePath + '.hrk';
        assert.ok(fs.existsSync(encryptedFile), 'Encrypted file not created');
        assert.ok(!fs.existsSync(filePath), 'Original file not removed');
    });

    it('should skip files ending with .hrk or .wizard', () => {
        const hrkFile = path.join(TEST_DIR, 'already.hrk');
        const wizardFile = path.join(TEST_DIR, 'meta.wizard');
        fs.writeFileSync(hrkFile, 'dummy');
        fs.writeFileSync(wizardFile, 'dummy');

        encFile(TEST_DIR, PASSWORD);

        assert.ok(fs.existsSync(hrkFile), 'Existing .hrk file should not be re-encrypted');
        assert.ok(fs.existsSync(wizardFile), '.wizard file should remain untouched');
    });

    it('should encrypt files inside subdirectories', () => {
        const subDir = path.join(TEST_DIR, 'nested');
        fs.mkdirSync(subDir);
        const nestedFile = path.join(subDir, 'deep.txt');
        fs.writeFileSync(nestedFile, 'deep secret');

        encFile(TEST_DIR, PASSWORD);

        const encryptedNested = nestedFile + '.hrk';
        assert.ok(fs.existsSync(encryptedNested), 'Nested encrypted file missing');
        assert.ok(!fs.existsSync(nestedFile), 'Original nested file not removed');
    });

    it('should throw "does not exist" error if directory is missing', () => {
        const missingDir = path.join(TEST_DIR, 'ghost');

        assert.throws(
            () => encFile(missingDir, PASSWORD),
            new RegExp(`Directory ${missingDir} does not exist.`),
        );
    });

    it('should throw "is not a directory" error if given path is a file', () => {
        const filePath = path.join(TEST_DIR, 'notadir.txt');
        fs.writeFileSync(filePath, 'data');

        assert.throws(
            () => encFile(filePath, PASSWORD),
            new RegExp(`${filePath} is not a directory.`),
        );
    });
});
