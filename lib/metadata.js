
import { getBinary } from './utils.js';

const tmdb_base_url = 'https://image.tmdb.org/t/p/w500/';

export default class Metadata {
    id;
    imdb;

    backdrop_url;
    backdrop_file;

    poster_url;
    poster_file;

    date;
    title;
    tagline;
    original_title;
    overview;

    static fromTMDB(details) {
        const infos = new Metadata();
        infos.id = details.id;
        infos.imdb = details.imdb_id;
        infos.backdrop_url = tmdb_base_url + details.backdrop_path;
        infos.poster_url = tmdb_base_url + details.poster_path;

        infos.date = details.release_date + 'T00:00:00Z';
        infos.title = details.title;
        infos.tagline = details.tagline;
        infos.original_title = details.original_title;
        infos.overview = details.overview;
        return infos;
    }

    async savePosterTo(file) {
        this.poster_file = file;
        await getBinary(file, this.poster_url);
    }

    // async complete(file) {
    //     await this.savePosterTo()
    // }
}