
//
// https://mkvtoolnix.download/doc/mkvpropedit.html
//
// Get tags: 'mkvpropedit --list-property-names'
//

import InfosFile from './infos-file.js';
import InfosMetadata from './infos-metadata.js';
import { run } from './utils.js';

const BIN = 'mkvpropedit';

/**
 * Set informations on movie
 *
 * @param {string} file as path
 * @param {InfosMetadata} infos to be set
 */
export async function setMKV(file, infos) {
    await run(BIN, [
        file,
        '--edit', 'info',
        '--set', `title=${infos.title}`,
        '--set', `date=${infos.date}`,
        // '--attachment-name', 'cover', '--attachment-mime-type', 'image/jpeg', '--set-attachment', coverFile
    ]);
}

export default class FormatMKV {
    /** @type {InfosFile} */
    #infosFile;

    constructor(infosFile) {
        this.#infosFile = infosFile;
    }

    getCoverFilepath() {
        return this.#infosFile.basepath + '.jpg';
    }

    getBackdropFilepath() {
        return this.#infosFile.basepath + '-backdrop.jpg';
    }

    /**
     *
     * @param {InfosMetadata} _infos to be injected
     */
    inject(_infos) {

    }
}
