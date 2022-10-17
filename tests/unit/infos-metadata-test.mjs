
import InfosMetadata from '../../lib/infos-metadata.js';
import { getFileSize, loadJSONData, t, tempPath } from '../test-helpers.js';

describe(t(import.meta), () => {
    const json = loadJSONData('ghost_1990');
    it('should get poster', async () => {
        const target = tempPath('infos_ghost_1990.jpg');

        const infos = InfosMetadata.fromTMDB(json);
        await infos.savePosterTo(target);

        expect(getFileSize(target)).toBeGreaterThan(50);
    });
});
