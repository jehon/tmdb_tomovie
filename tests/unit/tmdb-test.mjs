
import TMDBQuery from '../../lib/tmdb.js';
import { t } from '../test-helpers.js';

describe(t(import.meta), () => {
    describe('français', () => {
        const api = new TMDBQuery(TMDBQuery.fr);
        it('should find movie', async () => {
            const list = await api.search('Ghost', 1990);
            expect(list.length).toBeGreaterThan(5);
        });

        it('should get details', async () => {
            const details = await api.details(251);
            expect(details.title).toBe('Ghost');
            expect(details.tagline).toBe('On y croit tous.');
        });
    });

    describe('english', () => {
        const api = new TMDBQuery(TMDBQuery.en);
        it('should find movie', async () => {
            const list = await api.search('Ghost', 1990);
            expect(list.length).toBeGreaterThan(5);
        });

        it('should get details', async () => {
            const details = await api.details(251);
            expect(details.title).toBe('Ghost');
            expect(details.tagline).toBe('Before Sam was murdered, he told Molly he\'d love and protect her forever.');
        });
    });
});