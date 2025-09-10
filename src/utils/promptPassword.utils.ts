import readline from 'readline';

export default function promptPassword(promptText: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true,
        });

        let password = '';

        // Enable raw mode to capture keystrokes immediately
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        const onData = (char: Buffer) => {
            const key = char.toString();

            if (key === '\r' || key === '\n') {
                // Enter pressed -> finish
                process.stdin.setRawMode(false);
                rl.close();
                process.stdin.removeListener('data', onData);
                resolve(password.trim());
                return;
            }

            if (key === '\u0003') {
                // Ctrl+C
                process.exit();
            }

            if (key === '\u0008' || key === '\u007F') {
                // Backspace
                password = password.slice(0, -1);
            } else {
                password += key;
            }

            // redraw masked line
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(promptText + '*'.repeat(password.length));
        };

        process.stdin.on('data', onData);

        // Show initial prompt
        process.stdout.write(promptText);
    });
}
