import axiosInstance from "./axiosInstance";

const apiCaller = async (route, method = "GET", data = null, contentType = "json", isAuthHeader = false) => {
    try {
        const headers = {};

        if (contentType === "json") {
            headers["Content-Type"] = "application/json";
        } else if (contentType === "multipart") {
            headers["Content-Type"] = "multipart/form-data";
        }
        if (!isAuthHeader) {
            delete axiosInstance.defaults.headers.common["Authorization"];
        }

        const response = await axiosInstance({
            url: route,
            method,
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        console.error("API call error:", error.response?.data || error.message);
        throw error;
    }
};

export default apiCaller;
