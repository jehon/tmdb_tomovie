
import { getBinary } from '../../lib/utils.js';
import { t, tempPath } from '../test-helpers.js';
import fs from 'fs';

describe(t(import.meta), () => {
    describe('getBinary', () => {
        it('google icon', async () => {
            const target = tempPath('getBinary.ico');
            await getBinary(target, 'https://www.vatican.va/favicon.ico');
            expect(fs.statSync(target).size).toBeGreaterThan(10);
        });
    });
});