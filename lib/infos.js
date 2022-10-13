
const tmdb_base_url = 'https://image.tmdb.org/t/p/w500/';

export default class Infos {
    id;
    imdb;

    static fromTMDB(details) {
        this.id = details.id;
        this.imdb = details.imdb_id;
        this.backdrop_url = tmdb_base_url + details.backdrop_path;
        this.poster_url = tmdb_base_url + details.poster_path;

        this.date = details.release_date + 'T00:00:00Z';
        this.title = details.title;
        this.tagline = details.tagline;
        this.original_title = details.original_title;
        this.overview = details.overview;
    }
}