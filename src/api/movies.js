import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://movieverse-backend-staging.up.railway.app/",
});

export const getMovies = () => {
    return api.get("/movies");
};
