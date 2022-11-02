import axios from 'axios';

const API_KEY = 'd068a38a8f3df05b9b393906c79ccd4a';
const KEYWORD_BLACKLIST = '155477%2C190370';

export function movieByGenre(query, pageNumber) {
    return axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            page: pageNumber,
            with_genres: query,
            'certification.lte': 4,
            without_keywords: KEYWORD_BLACKLIST,
            include_adult: false
        }
    });
}

export function movieMultiFilter(query, sort, yearA, yearB, minRuntime, page) {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sort}&primary_release_date.gte=${yearA}&primary_release_date.lte=${yearB}&with_genres=${query}&with_runtime.lte=${minRuntime}&page=${page}&without_keywords=${KEYWORD_BLACKLIST}&include_adult=false`);
}

/*
export function movieFilters(query, sort, yearA, yearB, runtime, pageNum) {
    return axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            page: pageNumber,
            with_genres: query,
            'certification.lte': 4,
            without_keywords: KEYWORD_BLACKLIST,
            include_adult: false
        }
    });
}*/