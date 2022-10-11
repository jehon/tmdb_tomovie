
import process from 'process';

// Thanks to https://github.com/iFraan/tmdb.js

const key = process.env.JH_TMDB_KEY;

if (!key) {
    process.stderr.write('No JH_TMDB_KEY found. Exiting...\n');
    process.exit(1);
}

/**
 *
 * @param {string} url to be called (relative)
 * @param {...any} args to enrich the options
 * @returns {object} json as the result
 */
function tmdb(url, args) {
    return fetch('https://api.themoviedb.org' + url, {
        ...args,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${key}`
        }
    })
        .then(result => result.json());
}

export default (lang) => {
    return {
        /**
         * See https://developers.themoviedb.org/3/search/search-movies
         *
         * @param {string} name to be searched
         * @returns {Array<string>} mapping all movies
         */
        search: async (name) =>
            tmdb(`/4/search/movie?language=${lang}&query=${name}&include_adult=false`)
                .then(json => json.results)
                .then(list => list.map(
                    v => ({
                        id: v.id,
                        title: v.title,
                        original_title: v.original_title,
                        url: `https://www.themoviedb.org/movie/${v.id}`,
                        // id: v.id,
                        // v
                    })
                )),

        /**
         * See https://developers.themoviedb.org/3/movies/get-movie-details
         *
         * @param {string} id to be retrieved
         * @returns {object} with the details
         */
        details: async (id) =>
            tmdb(`/3/movie/${id}?language=${lang}`)
    };
};
