
export default class InfosMetadata {
    id;
    imdb;

    backdrop_file;
    poster_file;

    date;
    title;
    tagline;
    original_title;
    overview;

    static fromTMDB(rawMetadata) {
        const infos = new InfosMetadata();
        infos.id = rawMetadata.id;
        infos.imdb = rawMetadata.imdb_id;
        infos.date = rawMetadata.release_date + 'T00:00:00Z';
        infos.title = rawMetadata.title;
        infos.tagline = rawMetadata.tagline;
        infos.original_title = rawMetadata.original_title;
        infos.overview = rawMetadata.overview;
        return infos;
    }
}