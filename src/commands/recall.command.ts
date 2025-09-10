import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import { MAIN_DIR, MESSAGES } from '../constants/index.js';

export default function registerRecallCommand(program: Command) {
    program
        .command('recall')
        .description(MESSAGES.RECALL_COMMAND_DESC)
        .action(() => {
            const hrkDir = path.resolve(process.cwd(), MAIN_DIR);

            try {
                if (fs.existsSync(hrkDir)) {
                    console.log(MESSAGES.HRK_ALREADY_EXISTS);
                    console.log();
                } else {
                    fs.mkdirSync(hrkDir);
                    console.log(MESSAGES.HRK_CREATED);
                    console.log();
                }
            } catch {
                console.error(MESSAGES.FAILED_TO_CREATE_HRK);
                console.log();
            }
        });
}
