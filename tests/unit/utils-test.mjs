
import { getBinary, parseFilename } from '../../lib/utils.js';
import { t, tempPath } from '../test-helpers.js';
import fs from 'fs';

describe(t(import.meta), () => {
    describe('parseFilename', () => {
        const tfn = (fn, title, year) => it(fn, () => {
            const parsed = parseFilename(fn);
            expect(parsed.title)
                .withContext(`title of ${fn}`)
                .toBe(title);
            expect(parsed.year)
                .withContext(`year of ${fn}`)
                .toBe(year);
        });



        tfn('Ghost (1990)', 'Ghost', '1990');
    });

    describe('getBinary', () => {
        it('google icon', async () => {
            const target = tempPath('getBinary.ico');
            await getBinary(target, 'https://www.vatican.va/favicon.ico');
            expect(fs.statSync(target).size).toBeGreaterThan(10);
        });
    });
});