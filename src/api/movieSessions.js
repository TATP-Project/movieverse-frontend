import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://movieverse-backend-production.up.railway.app/",
    // baseURL:"http://localhost:8080/"
});

export const getSeatsByMovieSessionId = (movieSessionId) => {
    return api.get(`/movie-sessions/${movieSessionId}/seats`);
};

export const getMovieSessionsByMovieId = (movieId) => {
    return api.get(`/movie-sessions?movieId=${movieId}`);
};

export const updateSeatsByMovieSessionId = (id, data) => {
    return api.put(`/movie-sessions/${id}/seats`, data);
};
