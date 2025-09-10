import crypto from 'crypto';

export function hashPassword(password: string) {
    const usedSalt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, usedSalt, 64).toString('hex');
    return { hash, salt: usedSalt };
}

export function verifyPassword(password: string, storedHash: string, salt: string) {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return hash === storedHash;
}
