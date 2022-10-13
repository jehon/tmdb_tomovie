
import { spawnSync } from 'child_process';

/**
 * run a command and send back the string
 *
 * @param {string} cmd to be run
 * @param {Array<string>} args to complete it
 * @returns {string} as stdout
 */
export function run(cmd, args) {
    const result = spawnSync(cmd, args);
    if (result.status > 0) {
        console.error(`Error running ${cmd} with "${args.join('"  "')}"`);
        console.error(result.stdout?.toString() ?? '');
        console.error(result.stderr?.toString() ?? '');
        console.error(result);
        process.exit(1);
    }
    return result.stdout?.toString() ?? '';
}
/**
 * To parse a filename
 *
 * @param {string} fn as the filename
 * @returns {object} parsed data
 */
export function parseFilename(fn) {
    const regex = /^(?<title>[^(]+) \((?<year>[0-9]+)\)(.*)?$/;

    const match = fn.match(regex);

    // const title = fn.match(/(.+) (\([0-9]\)).*?/) ?? '';
    // const year = fn.match(/\([0-9]+\)/)[1] ?? '';

    // console.log({ title, year });

    return {
        title: match.groups.title ?? '',
        year: match.groups.year ?? ''
    };
}