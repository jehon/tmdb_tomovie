
import path, { dirname } from 'path';
import fs from 'fs';
import { run } from '../lib/utils.js';

/**
 * @param {object|string} meta from import.meta
 * @returns {string} the test name
 */
export function t(meta) {
    const url = (typeof (meta) == 'object' && 'url' in meta) ? meta.url : meta;
    return new URL(url).pathname.split('/').pop();
}

/**
 * @param {*} meta the meta object from import.meta
 * @returns {string} the pathname
 */
export function __filename(meta) {
    const url = (typeof (meta) == 'object' && 'url' in meta) ? meta.url : meta;
    return new URL(url).pathname;
}

/**
 * @param {*} meta the meta object from import.meta
 * @returns {string} the dirname
 */
export function __dirname(meta) {
    const url = (typeof (meta) == 'object' && 'url' in meta) ? meta.url : meta;
    return dirname(new URL(url).pathname);
}

export const fromCWD = (...args) => path.join(process.cwd(), ...args);
export const rootPath = (...args) => path.join((path.dirname(__dirname(import.meta))), ...args);

// Test
export const dataPath = (...args) => rootPath('tests', 'data', ...args);
export const tempPath = (...args) => rootPath('tmp', 'unit', ...args);

export const createMKV = async (file) => run(rootPath('tests/create.sh'), [file]);
export const loadJSONData = (file) => JSON.parse(fs.readFileSync(dataPath(file) + '.json', 'utf-8'));
export const getFileSize = (file) => fs.statSync(file).size;


fs.mkdirSync(tempPath(), { recursive: true });
