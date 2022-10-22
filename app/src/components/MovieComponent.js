import axios from 'axios';

const API_KEY = 'd068a38a8f3df05b9b393906c79ccd4a';
const KEYWORD_BLACKLIST = '155477%2C190370';

export function movieById(query) {
    return axios.get(`https://api.themoviedb.org/3/movie/${query}?api_key=${API_KEY}`);

}