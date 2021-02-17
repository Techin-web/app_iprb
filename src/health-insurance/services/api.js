import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const BASE_URL = "https://ea7f188e86ce.ngrok.io/api";
//const BASE_URL = 'http://134.209.38.41:3000/api';
const TOKEN_KEY = "techin-token";

axios.defaults.baseURL = BASE_URL;

export const setToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common["Authorization"] = token;
};

export const getAxiosInstance = () => {
    return axios;
};

export const getToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
};

export { BASE_URL };
