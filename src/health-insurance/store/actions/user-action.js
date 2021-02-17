import { BaseService, setToken } from "../../services";
import { setError } from "./error-action";
import { getToken, BASE_URL } from "../../services";

const UserService = new BaseService("/user");

const credentials = {
    email: "vendedorquallity@email.com",
    password: "123456",
};

const isValidToken = (token) => {
    return fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.status === 404 || response.status === 401;
    });
};

export const login = () => {
    return async (dispatch) => {
        try {
            const token = await getToken();
            const invalid = await isValidToken(token);

            if (invalid) {
                const { data } = await UserService.post("/login", credentials);
                await setToken(data.id);
            } else {
                await setToken(token);
            }
            return token;
        } catch (error) {
            dispatch(setError(error));
        }

        return null;
    };
};
