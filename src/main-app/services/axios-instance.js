import axios from "axios";

import { getToken } from "./auth-token";

const api = axios.create({
    baseURL: "http://1net.net.br:3331",
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
