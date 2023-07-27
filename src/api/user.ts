import http from "@/utils/http";

const controllerUrl = "/api/users";

export function loginApi<T>(data: object): ApiPromise<T> {
    return http({
        url: controllerUrl + "/login",
        data,
        method: "POST",
    });
}

export function userListApi<T>(data: object = {}): ApiPromise<T> {
    return http({
        url: controllerUrl + "/list",
        data,
        method: "POST",
    });
}
