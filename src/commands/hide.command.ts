import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import encFile from '../utils/encFile.utils.js';
import promptPassword from '../utils/promptPassword.utils.js';
import { hashPassword } from '../utils/password.utils.js';
import { MAIN_DIR, MESSAGES, PASSWORD_FILE } from '../constants/index.js';

export default function registerHideCommand(program: Command) {
    program
        .command('hide')
        .description(MESSAGES.HIDE_COMMAND_DESC)
        .action(async () => {
            const dirPath = path.resolve(process.cwd(), MAIN_DIR);
            const passPath = path.resolve(process.cwd(), `${MAIN_DIR}/${PASSWORD_FILE}`);

            if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
                console.error(MESSAGES.HRK_DOES_NOT_EXISTS);
                process.exit(1);
            }

            if (fs.existsSync(passPath)) {
                console.log(MESSAGES.ENC_WARNING);
                process.exit(1);
            }

            const password = await promptPassword(MESSAGES.PROMPT.ENTER_PASSWORD);
            const confirmPassword = await promptPassword(MESSAGES.PROMPT.CONFIRM_PASSWORD);

            if (password !== confirmPassword) {
                console.log(MESSAGES.PASSWORD.PASSWORD_MISMATCH);
                process.exit(1);
            }
            const { hash, salt } = hashPassword(password);

            // save hash + salt to .messy_pass
            fs.writeFileSync(passPath, JSON.stringify({ hash, salt }));

            try {
                encFile(dirPath, password);
                console.log(MESSAGES.SUCCESSFULLY_ENCRYPTED);
            } catch {
                console.error(MESSAGES.ENCRYPTION_FAILED);
            }
        });
}
