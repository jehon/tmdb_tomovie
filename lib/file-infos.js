
import path from 'path';

/**
 * To parse a filename
 *
 * @param {string} f as the filename
 * @returns {object} parsed data
 */
export default class FileInfos {
    path;
    filename;
    basepath;
    extension;
    title;
    year;

    static fromPath(f) {
        const fn = path.parse(f).name;
        const match = fn.match(/^(?<title>[^(]+) \((?<year>[0-9]+)\)(.*)?$/);

        const fi = new FileInfos();
        fi.path = f;
        fi.filename = fn;
        fi.basepath = path.dirname(f) + '/' + fn;
        fi.extension = path.parse(f).ext ?? '';
        fi.title = match.groups.title ?? '';
        fi.year = match.groups.year ?? '';

        return fi;
    }

}
