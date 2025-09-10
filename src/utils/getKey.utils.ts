import crypto from 'crypto';

export default function getKey(password: string): Buffer {
    return crypto.createHash('sha256').update(password).digest();
}
