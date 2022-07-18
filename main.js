#!/usr/bin/env node


import path from 'path';

import yargs from 'yargs';
import TMDB from './lib/tmdb.js';

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
        },
        'en': {
            type: 'boolean',
            default: false
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
process.stdout.write(`File is ${f}\n`);

const fn = path.parse(f).name;
process.stdout.write(`Looking for ${fn}...`);

const api = TMDB(options.en ? 'en' : 'fr');
const results = await api.search(fn);

for (let i = 0; i < results.length; i++) {
    const item = results[i];
    process.stdout.write(`${(i + '').padEnd(3)}: ${item.title.padEnd(40)} ${item.title != item.original_title ? `(${item.original_title})` : ''} ${item.url}\n`);
}

process.stdout.write('\n');
