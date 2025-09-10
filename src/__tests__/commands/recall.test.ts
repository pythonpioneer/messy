// __tests__/recall.command.test.ts
import { describe, it, mock, beforeEach, afterEach, type Mock } from 'node:test';
import assert from 'node:assert';
import { Command } from 'commander';
import registerRecallCommand from '../../commands/recall.command.js';
import fs from 'fs';
import { MESSAGES } from '../../constants/index.js';

describe('Testing recall CLI command', () => {
    let program: Command;
    let existsMock: Mock<typeof fs.existsSync>;
    let mkdirMock: Mock<typeof fs.mkdirSync>;
    let consoleLogMock: Mock<typeof console.log>;
    let consoleErrorMock: Mock<typeof console.error>;

    beforeEach(() => {
        program = new Command();
        registerRecallCommand(program);

        // Mock filesystem and console methods
        existsMock = mock.method(fs, 'existsSync', () => false);
        // eslint-disable-next-line
        // @ts-expect-error
        mkdirMock = mock.method(fs, 'mkdirSync', () => {});
        consoleLogMock = mock.method(console, 'log', () => {});
        consoleErrorMock = mock.method(console, 'error', () => {});
    });

    afterEach(() => {
        existsMock.mock.restore();
        mkdirMock.mock.restore();
        consoleLogMock.mock.restore();
        consoleErrorMock.mock.restore();
    });

    it('should create the "hrk.hrk" directory if it does not exist', async () => {
        existsMock.mock.calls.length = 0; // ensure no previous calls
        await program.parseAsync(['recall'], { from: 'user' });

        assert.ok(mkdirMock.mock.calls.length > 0, 'mkdirSync should be called');
        assert.ok(
            consoleLogMock.mock.calls.some((call) =>
                call.arguments[0].includes(MESSAGES.HRK_CREATED),
            ),
            'Success message should be logged',
        );
    });

    it('should log warning if "hrk.hrk" already exists', async () => {
        existsMock.mock.restore();
        existsMock = mock.method(fs, 'existsSync', () => true); // directory exists
        await program.parseAsync(['recall'], { from: 'user' });

        assert.ok(
            consoleLogMock.mock.calls.some((call) =>
                call.arguments[0].includes(MESSAGES.HRK_ALREADY_EXISTS),
            ),
            'Warning message should be logged',
        );
        assert.strictEqual(mkdirMock.mock.calls.length, 0, 'mkdirSync should not be called');
    });

    it('should log error if mkdirSync throws', async () => {
        existsMock.mock.restore();
        existsMock = mock.method(fs, 'existsSync', () => false); // directory does not exist
        mkdirMock.mock.restore();
        mkdirMock = mock.method(fs, 'mkdirSync', () => {
            throw new Error('Fake error');
        });

        await program.parseAsync(['recall'], { from: 'user' });

        assert.ok(
            consoleErrorMock.mock.calls.some((call) =>
                call.arguments[0].includes(MESSAGES.FAILED_TO_CREATE_HRK),
            ),
            'Error message should be logged',
        );
    });
});
