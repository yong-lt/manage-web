import http from "@/utils/http";
import { Group } from "./controllerUrl";

export function getFormatList<T>(): ApiPromise<T> {
    return http({
        url: Group + "format.list.name",
        method: "GET",
    });
}
