import { defineStore } from "pinia";
import { UserAccount } from "./interface";
import { USER_INFO } from "./constant/cacheKey";
import { loginApi } from "@/api/user";
import { Local } from "@/utils/storage";

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
        remember: false,
    }),
    getters: {
        getToken: state => state.token,
        getUserInfo: state => state,
        // getLoginPageInfo: state => ({ avatar_url: state.avatar_url, username: state.username, remember: state.remember }),
    },
    actions: {
        dataFill(state: UserInfo) {
            this.$state = { ...this.$state, ...state };
        },
        login(UserAccount: UserAccount) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await loginApi<UserInfo>({ username: UserAccount.username, password: UserAccount.password });
                    this.$state = { ...this.$state, ...res.data, remember: UserAccount.remember };
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
