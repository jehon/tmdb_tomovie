
import { spawnSync } from 'child_process';

/**
 * run a command and send back the string
 *
 * @param {string} cmd to be run
 * @param {array<string>} args to complete it
 * @returns {string} as stdout
 */
export function run(cmd, args) {
    const result = spawnSync(cmd, args);
    if (result.status > 0) {
        console.error(`Error running ${cmd} with ${args.join(' # ')}`);
        console.error(result.stderr.toString());
        process.exit(1);
    }
    return result.stdout?.toString() ?? '';
}
