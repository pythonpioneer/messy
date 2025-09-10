# Messy CLI Documentation

Messy CLI is a simple tool to securely encrypt and decrypt files inside a project directory. This documentation explains the available commands and their usage.

## Features

- **Easy to use**: Messy CLI is designed to be easy to use. It has a very simple command line interface.
- **Secure**: Messy CLI uses Node.js' built-in `crypto` module to encrypt and decrypt files. It uses AES-256-CBC encryption.
- **Fast**: Messy CLI is very fast. It uses Node.js' built-in `fs` module to read and write files.
- **Cross-platform**: Messy CLI is cross-platform. It works on Windows, macOS and Linux.

## Commands Overview

| Command  | Description |
|----------|-------------|
| `recall` | Initialize the app by creating the main directory. |
| `hide`   | Encrypt all files inside the main directory. |
| `show`   | Decrypt all files inside the main directory. |
| `info`   | Display author and maintainer information. |


## `recall` Command

**Initialize the app by creating `hrk.hrk` folder**

**Usage:**

```bash
messy recall
```

**Behavior:**

- Creates the main directory `hrk.hrk`.
- If the directory already exists. You can continue!

## `hide` Command

Encrypt all files inside the `hrk.hrk` directory. It will first prompt to `Enter and confirm the new password` everytime you use the `messy hide` command.

> Do not forget the password, it's the only way to recover your data.

**Usage:**

```bash
messy hide
```

**Behavior:**

- It will lock/encrypt everything inside the `hrk.hrk` directory.
- If there is already locked files in the main directory, then you need to first unlock and then lock the all files.

## `show` Command

Decrypt all files inside the `hrk.hrk` directory. It will first prompt to `Enter the password` and if password matched then and only then those file will be unlocked.

> Do not forget the password, it's the only way to recover your data.

**Usage:**

```bash
messy show
```

**Behavior:**

- It will verify the password and unlock every file inside the `hrk.hrk` directory.

## `info` Command

Get information about authors and maintainers.

**Usage:**

```bash
messy info
```

## Notes

- All commands assume the main directory is named `hrk.hrk`.
- Always keep your password secure. Losing the password may make encrypted files unrecoverable.
- For troubleshooting and advanced info, use:

```bash
messy info
```
