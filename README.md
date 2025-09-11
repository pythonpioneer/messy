# Messy CLI

**Messy CLI** is **your lightweight guardian of secrets**, a command-line companion that keeps your *digital treasures* safe. Whether it’s `code`, `images`, or even `videos`, Messy lets you tuck away your files behind strong encryption and bring them back whenever you choose.

With a few simple commands, you can **lock** (`hide`) or **unlock** (`show`) your vault, all from the terminal, **in just a few clicks**.

Unlike cloud-based tools, Messy lives entirely on your machine. It works **100% offline**, relies on **password-based protection**, and leaves **no backdoors**, meaning your files never wander off into the unknown, and **your privacy remains unshakable**.

Think of it as a **vault forged in code**: always at your side, ready to guard what matters most, and completely under your control.

![npm](https://img.shields.io/npm/dt/mostlymessy?label=Total%20Downloads&color=blue)
![npm](https://img.shields.io/npm/dw/mostlymessy?label=Weekly%20Downloads&color=green)

## Why Messy?

- **100% Secure**: Guard your files with battle-tested password encryption, strengthened with hashing and salting.
- **Fast & Simple**: With just a few keystrokes, lock down an entire directory tree; quick, clean, and effortless.
- **Offline-First**: No internet, no tracking, no leaks. Messy works entirely on your machine, keeping your secrets where they belong.
- **Self-Contained**: No third-party services, no hidden risks, just you, your files, and your vault.

### ⚠️ **The Vault Key Warning** - Important Security Note

> Your password is the **master key** to your secret vault.
> Lose it, and the treasures inside are **forever locked away**, not even we can rescue them.
> Guard it carefully, for it alone holds the power to unlock your files.

## Features of Messy CLI

- **Simple CLI**: Minimal, intuitive commands (`hide`, `show`, `recall`, `info`) crafted for both developers and everyday adventurers of the terminal.
- **AES-256-CBC Encryption**: Your files are guarded with **military-grade encryption**, powered by Node.js’ *crypto* module, unyielding and reliable.
- **Password Management**: Salted password hashing ensures your key is unique, secure, and impossible to guess.
- **Cross-Platform**: Your vault travels with you, works flawlessly on `Windows`, `MacOS`, and `Linux`.
- **Lightweight & Fast**: Reads and writes files at lightning speed using Node.js’ built-in *fs* module, so your secrets are secured in a blink.

## Open Source

**Messy CLI** is fully **open source**, meaning the vault’s secrets are yours to explore. Peek inside the code, understand the encryption magic, and even contribute your own spells to make it stronger.
- **Transparent**: Dive into the source code and see exactly how your files are protected, nothing is hidden.
- **Community-Driven**: Contributions, bug reports, and feature requests are always welcome.
- **Licensed for Freedom**: Released under the MIT License, giving you the liberty to use, modify, and expand Messy CLI in your own quests, personal or commercial.

## Commands Overview  

| Command   | Description |
|-----------|-------------|
| `recall`  | Create the main directory (`hrk.hrk`) to initialize the app. |
| `hide`    | Encrypt and lock all files inside the main directory. |
| `show`    | Decrypt and unlock all files inside the main directory. |
| `info`    | Display author and maintainer details. |

## `recall` Command

Think of `recall` as **summoning your secret vault**. 
This command brings the legendary folder `hrk.hrk` into existence, the very heart of Messy CLI.  

**Usage:**

```bash
messy recall
```

**Behavior:**

- Creates the main directory `hrk.hrk`, your personal vault.
- If the vault already exists, Messy will simply smile and let you carry on.

## `hide` Command

Step into the role of a guardian and **lock away your treasures**. The `hide` command will **encrypt everything inside your `hrk.hrk` vault**, guarding it with a password that only you hold.  

> ⚠️ **The Vault Key Warning**  
> Your password is the **only key** to unlock these secrets. Lose it, and your treasures remain sealed forever.  

**Usage:**

```bash
messy hide
```

**Behavior:**

- Casts a protective spell over all files in the `hrk.hrk` directory, **locking** them safely away.
- If some files are already locked, you must first **unlock** them (`show`) before casting the **lock** spell again.
- Every time you run `hide`, you fortify your vault, keeping your secrets safe and sound.

## `show` Command

Think of `show` as **opening the gates of your secret vault**. This command reveals the treasures hidden inside `hrk.hrk`, but only if you wield the correct password, the **master key** to your encrypted realm.  

> ⚠️ **The Vault Key Warning**  
> Your password is the **only key** to your encrypted files. Lose it, and the treasures remain forever locked, beyond reach. Guard it wisely.  

**Usage:**

```bash
messy show
```

**Behavior:**

- Prompts for your password and **verifies your identity**.
- Unlocks every file inside the `hrk.hrk` directory, restoring your secrets to the light.
- Fails silently if the password is incorrect, keeping the vault secure from prying eyes.
- Use `show` to reclaim your files and continue your adventure, knowing your vault remains safe and under your control.

## `info` Command

Embark on a quick reconnaissance mission! The `info` command reveals the heroes behind Messy CLI, the authors and maintainers who crafted your trusty vault.  

**Usage:**

```bash
messy info
```

## Notes from the Vault

- Every expedition assumes your main vault is named `hrk.hrk`.
- **Guard your password** like a legendary key, lose it, and your treasures may be lost forever.
- Need guidance or deeper knowledge? Use your compass

```bash
messy info
```

## A Final Word

Thank you for trusting Messy CLI as your companion on this journey of securing your files. Every command, every vault, and every password is designed with care, security, and simplicity in mind, just for you.

As you explore, encrypt, and unlock your treasures, know that Messy CLI stands quietly by your side, protecting what matters most.

> Guard your password like a loyal key, and your vault will remain steadfast, always ready for your next adventure.

With Messy CLI, your files aren’t just safe, they’re **cherished, private, and always under your care**.
