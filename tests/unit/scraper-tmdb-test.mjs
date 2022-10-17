
import FormatMKV from '../../lib/format-mkv.js';
import InfosFile from '../../lib/infos-file.js';
import ScraperTMDB from '../../lib/scraper-tmdb.js';
import { createMKV, getFileSize, t, tempPath } from '../test-helpers.js';

describe(t(import.meta), () => {
    describe('français', () => {
        const scraper = new ScraperTMDB(ScraperTMDB.fr);

        it('should find movie', async () => {
            const list = await scraper.search('Ghost', 1990);
            expect(list.length).toBeGreaterThan(5);
        });

        it('should get details', async () => {
            const infosMetadata = await scraper.getInfosMetadata(251);
            expect(infosMetadata.title).toBe('Ghost');
            expect(infosMetadata.tagline).toBe('On y croit tous.');
        });

        it('should download images', async () => {
            const fn = tempPath(t(import.meta));
            const file = fn + '.mkv';
            await createMKV(file);
            const infosFile = InfosFile.fromPath(file);
            const formatted = new FormatMKV(infosFile);
            await scraper.getInfosMetadata(251);

            await scraper.downloadCover(formatted);
            expect(getFileSize(fn + '.jpg')).toBeGreaterThan(100);

            await scraper.downloadBackdrop(formatted);
            expect(getFileSize(fn + '-backdrop.jpg')).toBeGreaterThan(100);
        });
    });

    describe('english', () => {
        const scraper = new ScraperTMDB(ScraperTMDB.en);

        it('should find movie', async () => {
            const list = await scraper.search('Ghost', 1990);
            expect(list.length).toBeGreaterThan(5);
        });

        it('should get details', async () => {
            const infosMetadata = await scraper.getInfosMetadata(251);
            expect(infosMetadata.title).toBe('Ghost');
            expect(infosMetadata.tagline).toBe('Before Sam was murdered, he told Molly he\'d love and protect her forever.');
        });
    });
});