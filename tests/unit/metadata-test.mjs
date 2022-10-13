
import Metadata from '../../lib/metadata.js';
import { getFileSize, loadJSONData, t, tempPath } from '../test-helpers.js';

describe(t(import.meta), () => {
    const json = loadJSONData('ghost_1990');
    it('should get poster', async () => {
        const target = tempPath('infos_ghost_1990.jpg');

        const infos = Metadata.fromTMDB(json);
        await infos.savePosterTo(target);

        expect(getFileSize(target)).toBeGreaterThan(50);
    });
});
