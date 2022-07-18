
import process from 'process';

// Thanks to https://github.com/iFraan/tmdb.js

const key = process.env.JH_TMDB_KEY;

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
        .then(result => result.json())
        .then(json => json.results);
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
                .then(list => list.map(
                    v => ({
                        title: v.title,
                        original_title: v.original_title,
                        url: `https://www.themoviedb.org/movie/${v.id}`,
                        // id: v.id,
                        // v
                    })
                ))
    };
};
