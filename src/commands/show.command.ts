import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import decFile from '../utils/decFile.utils.js';
import promptPassword from '../utils/promptPassword.utils.js';
import { verifyPassword } from '../utils/password.utils.js';
import { MAIN_DIR, MESSAGES, PASSWORD_FILE } from '../constants/index.js';

export default function registerShowCommand(program: Command) {
    program
        .command('show')
        .description(MESSAGES.SHOW_COMMAND_DESC)
        .action(async () => {
            const dirPath = path.resolve(process.cwd(), MAIN_DIR);
            const passPath = path.resolve(process.cwd(), `${MAIN_DIR}/${PASSWORD_FILE}`);

            if (!fs.existsSync(passPath)) {
                console.error(MESSAGES.PASSWORD.VERFICATION_FILE_MISSING);
                process.exit(1);
            }

            const stored = JSON.parse(fs.readFileSync(passPath, 'utf8'));
            const password = await promptPassword(MESSAGES.PROMPT.ENTER_PASSWORD);

            if (!verifyPassword(password, stored.hash, stored.salt)) {
                console.error(MESSAGES.PASSWORD.INCORRECT_PASSWORD);
                process.exit(1);
            }

            try {
                decFile(dirPath, password);
                fs.unlinkSync(passPath); // delete verification file after success
                console.log(MESSAGES.SUCCESSFULLY_DECRYPTED);
            } catch {
                console.error(MESSAGES.DECRYPTION_FAILED);
            }
        });
}
