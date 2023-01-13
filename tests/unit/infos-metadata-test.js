
import InfosMetadata from '../../lib/infos-metadata.js';
import { loadJSONData, t } from '../test-helpers.js';

describe(t(import.meta), () => {
    const json = loadJSONData('ghost_1990');
    it('should get poster', async () => {
        const im = InfosMetadata.fromTMDB(json);
        expect(im.id).toBe(251);
    });
});
