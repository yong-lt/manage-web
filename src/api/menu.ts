import http from "@/utils/http";
import { baTableApi } from "./common";
import { Menu } from "./controllerUrl";

// export function menuListApi<T>(parent_id: number): ApiPromise<T> {
//     return http({
//         url: controllerUrl + "/list",
//         data: { parent_id },
//         method: "POST",
//     });
// }

// export function getListApi<T>(): ApiPromise<T> {
//     return http({
//         url: controllerUrl + "/list",
//         method: "GET",
//     });
// }

export const getListApi = (data?: anyObj) => new baTableApi(Menu).list(data);
