
import process from 'process';

// Thanks to https://github.com/iFraan/tmdb.js

const key = process.env.JH_TMDB_KEY;

/**
 *
 * @param url
 * @param {...any} args
 */
function tmdb(url, ...args) {
    return fetch(url, {
        ...args,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${key}`
        }
    });
}

export default (lang) => {
    return {
        /**
         * @param {string} name to be searched
         * @returns {Array<string>} mapping all movies
         */
        search: async (name) =>
            tmdb(`https://api.themoviedb.org/4/search/movie?language=${lang}&query=${name}&include_adult=false`)
                .then(result => result.json())
                .then(json => json.results)
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
