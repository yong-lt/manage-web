import axios from "axios";
import { Local } from "./storage";
import { USER_INFO } from "@/stores/constant/cacheKey";
import { ElNotification } from "element-plus";
import { onLogout } from "./common";

const service = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
});

service.interceptors.request.use(
    config => {
        const token = Local.get(USER_INFO).token;
        if (token) {
            config.headers["Token"] = token;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.code !== 200) {
            ElNotification.error({ title: "请求错误", message: res.msg || "Error" });

            if (res.code === 401) {
                onLogout();
            }

            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            return res;
        }
    },
    error => {
        ElNotification.error({ title: "服务器错误", message: error.message || "Error" });
        onLogout();
        return Promise.reject(error);
    }
);

export default service;
