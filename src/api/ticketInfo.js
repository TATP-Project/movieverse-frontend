import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://movieverse-backend-production.up.railway.app/",
});

export const postTicket = (ticket) => {
    return api.post("/tickets", ticket);
};
