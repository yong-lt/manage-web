import http from "@/utils/http";
import { Users } from "./controllerUrl";
import { baTableApi } from "./common";

export function loginApi<T>(data: object): ApiPromise<T> {
    return http({
        url: Users + "login",
        data,
        method: "POST",
    });
}

// 获取用户个人信息
export const getUserInfo = (): ApiPromise<UserInfo> => new baTableApi(Users).info();

// 用户个人信息修改
export const modifyUserInfo = (data: { id: number; nickname: string; password: string }) => new baTableApi(Users).modify(data);
