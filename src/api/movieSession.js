import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    // baseURL: "https://movieverse-backend-staging.up.railway.app/",
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const getMovieSession = (id) => {
    return api.get(`/moviesessions/${id}`);
};
