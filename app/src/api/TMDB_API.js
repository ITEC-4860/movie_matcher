import React from "react";

const API_KEY = 'd068a38a8f3df05b9b393906c79ccd4a';
const KEYWORD_BLACKLIST = '155477%2C190370';

/* General API Call Helper Functions */
function SearchFormatter(query){
    return query.replace(/ /g, '+');
}

/* Movie Specific TMDB API Call Functions */
export function MovieById(movieId) {
    const [film, setFilm] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                setFilm(responseJson)
            }))
    }, []);
    return film;
}

export function GetMovieCastCrew(movieId) {
    const [castCrew, setCastCrew] = React.useState([]);
    React.useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/' + movieId + '/casts?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                setCastCrew(responseJson);
            }))
    }, []);
    return castCrew;
}

export function SearchMovie(query) {
    const movieQuery = SearchFormatter(query);
    const [results, setResults] = React.useState([]);
    React.useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + movieQuery + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setResults(responseJson);
            }))
    }, []);
    return results;
}

export function MoviesByGenre(genreQuery, page) {
    const [films, setFilms] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&sort_by=popularity.desc&with_genres='+ genreQuery
        +'&certification.lte=4&page=' + page + '&without_keywords=' + KEYWORD_BLACKLIST + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setFilms(responseJson);
            }))
    }, []);
    return films;
}

export function MoviesByMultiFilter(genreQuery, year, runtime, sort, page) {
    const [films, setFilms] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&sort_by=' + sort +
        +'&primary_release_year=' + year + '&with_genres=' + genreQuery + '&with_runtime.lte=' + runtime + '&page=' + page
        +'&without_keywords=' + KEYWORD_BLACKLIST + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setFilms(responseJson);
            }))
    }, []);
    return films;
}

export function MoviesByMultiFilterYearRange(genreQuery, yearA, yearB, runtime, sort, page) {
    const [films, setFilms] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&sort_by=' + sort +
        +'&primary_release_date.gte=' + yearA + '&primary_release_date.lte=' + yearB + '&with_genres=' + genreQuery + '&with_runtime.lte=' + runtime + '&page=' + page
        +'&without_keywords=' + KEYWORD_BLACKLIST + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setFilms(responseJson);
            }))
    }, []);
    return films;
}

export function MovieImage(movieId) {
    const [image, setImage] = React.useState("");
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                const path = JSON.stringify("https://image.tmdb.org/t/p/original/" + responseJson['poster_path']);
                setImage(path.substring(1, path.length-1));
            }))
    }, []);
    return image;
}

/* TV Show Specific TMDB API Call Functions */
export function TvById(tvId) {
    const [show, setShow] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + tvId + '?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                setShow(responseJson)
            }))
    }, []);
    return show;
}

export function GetTvCastCrew(tvId) {
    const [castCrew, setCastCrew] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + tvId + '/credits?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                setCastCrew(responseJson);
            }))
    }, []);
    return castCrew;
}

export function SearchTv(query) {
    const tvQuery = SearchFormatter(query);
    const [results, setResults] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/search/tv?api_key=' + API_KEY + '&query=' + tvQuery + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setResults(responseJson);
            }))
    }, []);
    return results;
}

export function TvByMultiFilter(genreQuery, year, sort, page) {
    const [shows, setShows] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=' + API_KEY + '&sort_by=' + sort +
            +'&first_air_date_year=' + year + '&with_genres=' + genreQuery + '&page=' + page + '&include_adult=false')
            .then((response) => response.json())
            .then((responseJson => {
                setShows(responseJson);
            }))
    }, []);
    return shows;
}

export function TvImage(tvId) {
    const [image, setImage] = React.useState("");
    React.useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + tvId + '?api_key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson => {
                const path = JSON.stringify("https://image.tmdb.org/t/p/original/" + responseJson['poster_path']);
                setImage(path.substring(1, path.length-1));
            }))
    }, []);
    return image;
}