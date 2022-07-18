#!/usr/bin/env node

// Thanks to https://github.com/iFraan/tmdb.js

import yargs from 'yargs';

const options = await yargs(process.argv.slice(2))
    .options({
        'dryRun': {
            alias: ['dry-run', 'n'],
            type: 'boolean',
            default: false,
            coerce: (val) => {
                if (val) {
                    console.info('Using dry run mode');
                }
                return val;
            }
        },
        'verbose': {
            alias: ['v'],
            type: 'boolean',
            default: false
        },
        'file': {
            // Also posible at end : $0 ... <file>
            alias: ['f'],
            type: 'string',
            default: ''
        }
    })
    .command('$0 <file>', 'The initial movie')
    .recommendCommands()
    .strict()
    .help()
    .alias('help', 'h')
    .argv;

// console.log(options);

const f = options.file;

process.stdout.write(`Looking for ${f}...`);

process.stdout.write('\n');

