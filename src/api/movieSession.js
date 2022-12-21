import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://movieverse-backend-production.up.railway.app/",
});

export const getMovieSession = (id) => {
    return api.get(`/moviesessions/${id}`);
};
