import axios from "axios";

export function tmdbGet(path, apiKey, params = {}) {
    return axios.get(`https://api.themoviedb.org/3${path}`, {
        params: { language: "en-US", ...params },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey?.trim()}`,
        },
    });
}

export function toMovie(movie) {
    return {
        id: movie.id,
        genre_ids: movie.genre_ids,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
    };
}
