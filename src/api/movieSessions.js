import axios from "axios";

const api = axios.create({
    // baseURL: "https://movieverse-backend-staging.up.railway.app/",
    baseURL: "http://localhost:8080/",
});

export const getSeatsByMovieSessionId = (movieSessionId) => {
    return api.get(`/movie-sessions/${movieSessionId}/seats`)
}

export const updateSeatsByMovieSessionId = (movieSessionId, data) => {
    return api.put(`/movie-sessions/${movieSessionId}/seats`, data)
}