
import ScraperTMDB from '../../lib/scraper-tmdb.js';
import { t } from '../test-helpers.js';

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