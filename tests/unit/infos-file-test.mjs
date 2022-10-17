
import { t } from '../test-helpers.js';
import InfosFile from '../../lib/infos-file.js';

describe(t(import.meta), () => {
    describe('parseFilename', () => {
        const tfn = (fn, title, year, cb = () => { }) => it(fn, () => {
            const parsed = InfosFile.fromPath(fn);
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
});