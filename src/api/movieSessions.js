import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
});

export const getSeatsByMovieSessionId = (movieSessionId) => {
    return api.get(`/movie-sessions/${movieSessionId}/seats`)
}