#!/usr/bin/env node
import { Command } from 'commander';
import registerRecallCommand from './commands/recall.command.js';
import registerHideCommand from './commands/hide.command.js';
import registerShowCommand from './commands/show.command.js';
import registerInfocommand from './commands/info.command.js';

// initialize CLI commands
const program = new Command();

// register CLI commands
registerRecallCommand(program);
registerHideCommand(program);
registerShowCommand(program);
registerInfocommand(program);

// If no command is given, display custom message + help
if (!process.argv.slice(2).length) {
    console.log('⚡ Welcome to Messy CLI! ⚡');
    console.log('Run `messy --help` to explore available commands.\n');
    program.outputHelp();
    process.exit(0); // 👈 prevents commander from re-printing default help
}

// parse CLI commands
program.parse(process.argv);
