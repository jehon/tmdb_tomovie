#!/usr/bin/env node

import *  as readline from 'readline/promises';
import process from 'process';

import yargs from 'yargs';
import TMDBQuery from './lib/tmdb.js';
import { parseFilename } from './lib/utils.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

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

const api = new TMDBQuery(options.en ? TMDBQuery.en : TMDBQuery.fr);
const movie = parseFilename(f);

process.stdout.write(`Looking for ${movie.title}...`);
const results = await api.search(movie.title, movie.year);
process.stdout.write('done\n');

for (let i = 0; i < results.length; i++) {
    const item = results[i];
    process.stdout.write(`${(i + '').padEnd(3)}: ${item.title.padEnd(40)} ${item.title != item.original_title ? `(${item.original_title})` : ''} ${item.url}\n`);
}

const index = await rl.question('Selection? ');
rl.close();
const selected = results[index];
process.stdout.write(`Selected #${index} ${selected.title}...`);

process.stdout.write(`Looking for #${selected.id}...`);
const details = await api.details(selected.id);
process.stdout.write('done\n');

console.warn(details);

process.stdout.write('\n');
