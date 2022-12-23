import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:9999/",
    baseURL: "https://freeimage.host/api/1/upload/",
});

export const postIcon = () => {
    return api.get("foods");
};
