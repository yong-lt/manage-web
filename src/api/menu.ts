import http from "@/utils/http";

const controllerUrl = "/api/menu";

// export function menuListApi<T>(parent_id: number): ApiPromise<T> {
//     return http({
//         url: controllerUrl + "/list",
//         data: { parent_id },
//         method: "POST",
//     });
// }

export function getListApi<T>(): ApiPromise<T> {
    return http({
        url: controllerUrl + "/list",
        method: "GET",
    });
}

export function deleteMenuApi(id: number): ApiPromise {
    return http({
        url: controllerUrl + "/delete",
        data: { id },
        method: "POST",
    });
}

export function modifyMenuApi(data: object, parent_id = 0): ApiPromise {
    return http({
        url: controllerUrl + "/modify",
        data: {
            ...data,
            parent_id,
        },
        method: "POST",
    });
}
