
import process from 'process';
import { run } from './utils.js';

// Thanks to https://github.com/iFraan/tmdb.js

// 'run' will always return a strin
const key = process.env.JH_TMDB_KEY ?? run('jh-config', ['get', 'JH_TMDB_KEY']);

if (key.length < 50) {
    process.stderr.write('JH_TMDB_KEY `${key}`} invalid (too short). Exiting...\n');
    process.stderr.write(`Environment was ${process.env.JH_TMDB_KEY}`);
    process.exit(1);
}
process.stdout.write(`Key found: ${key.length} characters\n`);

/**
 *
 * @param {string} url to be called (relative)
 * @param {...any} args to enrich the options
 * @returns {object} json as the result
 */
function apiCall(url, args) {
    return fetch('https://api.themoviedb.org' + url, {
        ...args,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${key}`
        }
    })
        .then(result => result.json());
}

/*
 *
 *
 *
 *
 */
export default class TMDBQuery {
    static get fr() {
        return 'fr';
    }

    static get en() {
        return 'en';
    }

    #lang;

    constructor(lang) {
        this.#lang = lang;
    }

    /**
     * See https://developers.themoviedb.org/3/search/search-movies
     *
     * @param {string} name to be searched
     * @param {string} year to be searched
     * @returns {Array<string>} mapping all movies
     */
    async search(name, year) {
        return apiCall(`/4/search/movie?language=${this.#lang}&include_adult=false&query=${name}&year=${year}`)
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
            ));
    }
    /**
     * See https://developers.themoviedb.org/3/movies/get-movie-details
     *
     * @param {string} id to be retrieved
     * @returns {object} with the details
     */
    async details(id) {
        return apiCall(`/3/movie/${id}?language=${this.#lang} `);
    }
}
