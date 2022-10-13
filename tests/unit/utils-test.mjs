
import { parseFilename } from '../../lib/utils.js';
import { t } from '../test-helpers.js';

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
});