
import TMDBQuery from '../../lib/tmdb.js';
import { t } from '../test-helpers.js';

describe(t(import.meta), () => {
    describe('français', () => {
        const api = new TMDBQuery(TMDBQuery.fr);
        it('should find movie', async () => {
            const list = await api.search('Ghost');
            expect(list.length).toBeGreaterThan(5);
        });
    });

    describe('english', () => {
        const api = new TMDBQuery(TMDBQuery.en);
        it('should find movie', async () => {
            const list = await api.search('Ghost');
            expect(list.length).toBeGreaterThan(5);
        });
    });
});