import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import getKey from './getKey.utils.js';

const algorithm = 'aes-256-cbc';

export default function encFile(dirPath: string, password: string) {
    if (!fs.existsSync(dirPath)) {
        throw new Error(`Directory ${dirPath} does not exist.`);
    }

    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
        throw new Error(`${dirPath} is not a directory.`);
    }

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (file.endsWith('.hrk')) return; // already encrypted, skip
        if (file.endsWith('.wizard')) return; // metadata file, skip

        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // 🔁 recurse into subdirectory
            encFile(filePath, password);
            return;
        }

        const content = fs.readFileSync(filePath);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, getKey(password), iv);
        const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);
        const finalData = Buffer.concat([iv, encrypted]);

        fs.writeFileSync(filePath + '.hrk', finalData);
        fs.unlinkSync(filePath); // remove original file
    });
}
