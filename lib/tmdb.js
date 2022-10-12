
import process from 'process';
import { run } from './utils.js';

// Thanks to https://github.com/iFraan/tmdb.js

const key = process.env.JH_TMDB_KEY ?? run('jh-config', ['get', 'JH_TMDB_KEY']);

if (!key) {
    process.stderr.write('No JH_TMDB_KEY found. Exiting...\n');
    process.exit(1);
}
process.stdout.write(`Key found: ${key.length} characters`);

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
 * {
  adult: false,
  backdrop_path: '/zOyXP0MS4jvU01yIxzRV394ZUJw.jpg',
  belongs_to_collection: null,
  budget: 22000000,
  genres: [
    { id: 14, name: 'Fantasy' },
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' }
  ],
  homepage: '',
  id: 251,
  imdb_id: 'tt0099653',
  original_language: 'en',
  original_title: 'Ghost',
  overview: "Sam Wheat is a banker, Molly Jensen is an artist, and the two are madly in love. However, when Sam is murdered by his friend and corrupt business partner Carl Bruner over a shady business deal, he is left to roam the earth as a powerless spirit. When he learns of Carl's betrayal, Sam must seek the help of psychic Oda Mae Brown to set things right and protect Molly from Carl and his goons.",
  popularity: 43.265,
  poster_path: '/w9RaPHov8oM5cnzeE27isnFMsvS.jpg',
  production_companies: [
    {
      id: 4,
      logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
      name: 'Paramount',
      origin_country: 'US'
    }
  ],
  production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  release_date: '1990-07-12',
  revenue: 505000000,
  runtime: 127,
  spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
  status: 'Released',
  tagline: "Before Sam was murdered, he told Molly he'd love and protect her forever.",
  title: 'Ghost',
  video: false,
  vote_average: 7.188,
  vote_count: 4706
}
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
     * @returns {Array<string>} mapping all movies
     */
    async search(name) {
        return apiCall(`/4/search/movie?language=${this.#lang}&query=${name}&include_adult=false`)
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
