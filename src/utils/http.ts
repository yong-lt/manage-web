import axios from "axios";
import { Local } from "./storage";
import { USER_INFO } from "@/stores/constant/cacheKey";
import { ElNotification } from "element-plus";

import { useUserInfo } from "../stores/user";
import { storeToRefs } from "pinia";

const service = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000,
});

service.interceptors.request.use(
    config => {
        const user = storeToRefs(useUserInfo());
        if (user.token) {
            config.headers["Token"] = Local.get(USER_INFO).token;
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
            ElNotification.error(res.msg || "Error");

            if (res.code === 401) {
                const user = useUserInfo();
                user.$reset();
            }

            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            return res;
        }
    },
    error => {
        ElNotification.error(error.message || "Error");
        const user = useUserInfo();
        user.$reset();
        Local.remove(USER_INFO);
        return Promise.reject(error);
    }
);

export default service;
