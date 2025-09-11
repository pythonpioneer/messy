import { Command } from 'commander';
import { AUTHOR_INFO, MESSAGES } from '../constants/index.js';

export default function registerInfocommand(program: Command) {
    program
        .command('info')
        .description(MESSAGES.INFO_COMMAND_DESC)
        .action(() => {
            console.log('Author Details:');
            console.log(`Name: ${AUTHOR_INFO.NAME}`);
            console.log(`Email: ${AUTHOR_INFO.EMAIL}`);
            console.log(`GitHub: ${AUTHOR_INFO.GITHUB}`);
            console.log(`Documentation: ${AUTHOR_INFO.DOCUMENTATION}`);
            console.log();
        });
}
