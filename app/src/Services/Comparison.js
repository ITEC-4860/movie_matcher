// TODO: Instead of this it would be better to implement the pagination on library file instead? Keep requests to backend here?

/*
Takes two arrays of ints and returns an array containing ints that matched.
Returns an empty array if no matches.
 */
export function combineGenres(user0Array, user1Array) {
    const output = [];
    for (const i in user0Array) {
        if (user1Array.includes(i)) {
            output.push(i);
        }
    }
    return output;
}

/*
Takes two users and returns movies that match their preferred genres and time limitations.
Each page is 20 results starting with 1. Use this function with a counter on the front end for pagination.
 */
export function retrieveMovies(user0, user1, page) {
    // TODO: Request genres and time from backend
    // Next line transforms the matching genre array into a string with results seperated by comma
    const matchedGenre = combineGenres(user0GenreRequest, user1GenreRequest).join();
    const maximumTime = Math.min(user0Time, user1Time);
    // TODO:
}