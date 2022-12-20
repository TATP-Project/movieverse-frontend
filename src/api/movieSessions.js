import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8080/",
    baseURL: "https://movieverse-backend-staging.up.railway.app/",
});

export const getSeatsByMovieSessionId = (movieSessionId) => {
    return api.get(`/movie-sessions/${movieSessionId}/seats`)
}