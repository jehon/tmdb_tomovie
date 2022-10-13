
import { getBinary, parseFilename } from '../../lib/utils.js';
import { t, tempPath } from '../test-helpers.js';
import fs from 'fs';

describe(t(import.meta), () => {
    describe('parseFilename', () => {
        const tfn = (fn, title, year, cb = () => { }) => it(fn, () => {
            const parsed = parseFilename(fn);
            expect(parsed.path)
                .withContext(`path of ${fn}`)
                .toBe(fn);
            expect(parsed.title)
                .withContext(`title of ${fn}`)
                .toBe(title);
            expect(parsed.year)
                .withContext(`year of ${fn}`)
                .toBe(year);

            cb(parsed);
        });



        tfn('Ghost (1990)', 'Ghost', '1990');

        tfn('Ghost (1990).mkv', 'Ghost', '1990', (parsed) => {
            expect(parsed.basepath).toBe('./Ghost (1990)');
        });

        tfn('/some/where/Ghost (1990).mkv', 'Ghost', '1990', (parsed) => {
            expect(parsed.extension).toBe('.mkv');
            expect(parsed.basepath).toBe('/some/where/Ghost (1990)');
        });
    });

    describe('getBinary', () => {
        it('google icon', async () => {
            const target = tempPath('getBinary.ico');
            await getBinary(target, 'https://www.vatican.va/favicon.ico');
            expect(fs.statSync(target).size).toBeGreaterThan(10);
        });
    });
});