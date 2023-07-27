import { defineStore } from "pinia";
import { UserAccount } from "./interface";
import { USER_INFO } from "./constant/cacheKey";
import { loginApi } from "@/api/user";

export const useUserInfo = defineStore("userinfo", {
    state: (): UserInfo => ({
        id: 0,
        username: "",
        token: "",
        create_time: "",
        update_time: "",
        avatar_url: "",
        last_login_time: "",
        nickname: "",
    }),
    getters: {
        getToken: state => state.token,
        getUserInfo: state => state,
    },
    actions: {
        login(UserAccount: UserAccount) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await loginApi<UserInfo>(UserAccount);
                    this.$state = { ...this.$state, ...res.data };
                    resolve(res.data);
                } catch (error) {
                    reject(error);
                }
            });
        },
    },
    persist: {
        key: USER_INFO,
    },
});
