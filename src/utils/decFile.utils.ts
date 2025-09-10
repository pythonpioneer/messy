import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import getKey from './getKey.utils.js';

const algorithm = 'aes-256-cbc';

export default function decFile(dirPath: string, password: string) {
    if (!fs.existsSync(dirPath)) {
        throw new Error(`Directory ${dirPath} does not exist.`);
    }

    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
        throw new Error(`${dirPath} is not a directory.`);
    }

    const processDir = (currentPath: string) => {
        const files = fs.readdirSync(currentPath);

        files.forEach((file) => {
            const filePath = path.join(currentPath, file);

            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                // recurse into subdirectories
                processDir(filePath);
                return;
            }

            if (!file.endsWith('.hrk')) return; // not encrypted, skip

            const content = fs.readFileSync(filePath);

            const iv = content.subarray(0, 16);
            const encrypted = content.subarray(16);

            const decipher = crypto.createDecipheriv(algorithm, getKey(password), iv);
            const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

            const outFile = filePath.replace(/\.hrk$/, '');
            fs.writeFileSync(outFile, decrypted);
            fs.unlinkSync(filePath);
        });
    };

    processDir(dirPath);
}
