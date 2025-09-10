export const APP_NAME = 'messy';
export const MAIN_DIR = 'hrk.hrk';
export const PASSWORD_FILE = '.wizard';

export const MESSAGES = {
    HRK_ALREADY_EXISTS: '⚠️ Main directory already created. You can skip recall. ⚠️',
    HRK_CREATED: '🎉 Setup complete! Main directory initialized successfully. 🎉',
    FAILED_TO_CREATE_HRK: `❌ We couldn't create the main directory. Don't worry -- try running the command again. ❌`,
    HRK_DOES_NOT_EXISTS: `❌ Main folder missing. Please initialize with "messy recall". ❌`,
    ENC_WARNING: '⚠️ Files are already locked. Run "messy show" before hiding again. ⚠️',
    PASSWORD: {
        INCORRECT_PASSWORD: `❌ Oops! The password you entered doesn't match. Please try again. ❌`,
        PASSWORD_MISMATCH: `❌ Oops! The passwords you entered don't match. Please try again. ❌`,
        VERFICATION_FILE_MISSING: `❌ Verification file is missing. Try running "messy hide" first.\nIf that doesn't work, decryption cannot continue and your data may be unrecoverable.\nRun "messy info" or visit the docs for guidance. ❌`,
    },
    SUCCESSFULLY_DECRYPTED: '✅ Files Unlocked Successfully. ✅',
    SUCCESSFULLY_ENCRYPTED: '✅ Files Locked Successfully. ✅',
    DECRYPTION_FAILED: '❌ Decryption failed ❌',
    ENCRYPTION_FAILED: '❌ Encryption failed ❌',
    PROMPT: {
        ENTER_PASSWORD: 'Enter New Password: ',
        CONFIRM_PASSWORD: 'Confirm Password: ',
    },
    HIDE_COMMAND_DESC: `🔒 Secure your files (locking everything inside ${MAIN_DIR}). 🔒`,
    RECALL_COMMAND_DESC: `✨ Initialize by creating your ${MAIN_DIR} directory. ✨`,
    SHOW_COMMAND_DESC: `🔓 Access your files (unlocking everything in ${MAIN_DIR}). 🔓`,
    INFO_COMMAND_DESC: `📜 Get information about authors and maintainers. 📜`,
};

export const AUTHOR_INFO = {
    EMAIL: 'messy@artnhrk.dev',
    NAME: 'Hritik Kumar Sinha',
    GITHUB: 'https://github.com/artnhrk',
};
