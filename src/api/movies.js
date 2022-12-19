import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9999/",
});

export const getMovies = () => {
    return api.get("/movies");
};
export const getMovieSessions = (id) => {
    return api.get("/movie-sessions?movieId=" + id);
};
