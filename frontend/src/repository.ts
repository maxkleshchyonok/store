import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const repository = axios.create({
    baseURL: REACT_APP_API_URL,
    //withCredentials: true,
});

repository.interceptors.request.use((config) => {

    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
});

repository.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem('refresh_token');
            try {
                const token = await axios.post(`${REACT_APP_API_URL}/auth/refresh`, { refresh }
                );

                if (!token) {
                    localStorage.removeItem('refresh-token');
                    return;
                }

                sessionStorage.setItem('access-token', token.data.accessToken);

                return repository(originalRequest);
            } catch (error) {
                sessionStorage.removeItem('access-token');
                localStorage.removeItem('refresh-token');
                return Promise.reject(error);
            }
        }

        return error.response?.data?.message;
    }
);


export default repository;