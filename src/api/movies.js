import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8080/",
    baseURL: "https://movieverse-backend-staging.up.railway.app/",
});

export const getMovies = () => {
    return api.get("/movies");
};
export const getMovieSessions = (id) => {
    return api.get("/movie-sessions?movieId=" + id);
};
