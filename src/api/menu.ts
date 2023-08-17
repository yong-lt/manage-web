import http from "@/utils/http";
import { Menu } from "./controllerUrl";

export function getAuthMenu<T>(): ApiPromise<T> {
    return http({
        url: Menu + "auth.menu",
        method: "GET",
    });
}
