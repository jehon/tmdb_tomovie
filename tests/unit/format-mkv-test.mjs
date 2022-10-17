
import InfosMetadata from '../../lib/infos-metadata.js';
import FormatMKV from '../../lib/format-mkv.js';
import { createMKV, loadJSONData, t, tempPath } from '../test-helpers.js';

describe(t(import.meta), () => {
    const json = loadJSONData('ghost_1990');
    const file = tempPath('create.mkv');
    const infos = InfosMetadata.fromTMDB(json);

    it('should say where to save the file', async () => {
        await createMKV(file);
        const formated = new FormatMKV(file);

        expect(formated.getCoverFilepath()).toMatch(/.*\.jpg/);
        expect(formated.getBackdropFilepath()).toMatch(/.*\.jpg/);
    });

    it('should write informations', async () => {
        await createMKV(file);
        const formatted = new FormatMKV(file);

        formatted.inject(infos);
        expect(true).toBeTrue();
    });
});
