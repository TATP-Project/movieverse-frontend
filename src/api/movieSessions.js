import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://movieverse-backend-production.up.railway.app/",
    // baseURL: process.env.BASE_URL,
});

export const getSeatsByMovieSessionId = (movieSessionId) => {
    return api.get(`/movie-sessions/${movieSessionId}/seats`);
};
