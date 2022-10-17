
import InfosMetadata from '../../lib/infos-metadata.js';
import { setMKV } from '../../lib/format-mkv.js';
import { createMKV, loadJSONData, t, tempPath } from '../test-helpers.js';

describe(t(import.meta), () => {
    const json = loadJSONData('ghost_1990');
    const file = tempPath('create.mkv');
    const infos = InfosMetadata.fromTMDB(json);

    it('should write informations', async () => {
        await createMKV(file);
        setMKV(file, infos);

        expect(true).toBeTrue();
    });
});
