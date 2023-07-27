import http from "@/utils/http";

/**
 * 生成一个控制器的：增、删、改、查、排序的操作url
 */
export class baTableApi {
    private controllerUrl;
    public actionUrl;

    constructor(controllerUrl: string) {
        this.controllerUrl = controllerUrl;
        this.actionUrl = new Map([
            ["list", controllerUrl + "list"],
            ["modify", controllerUrl + "modify"],
            ["info", controllerUrl + "info"],
            ["delete", controllerUrl + "delete"],
        ]);
    }

    // 列表查询
    list<T = any>(h = false): ApiPromise<T> {
        return http({
            url: this.actionUrl.get("list"),
            method: "GET",
            params: { h },
        });
    }

    // 数据新增修改
    modify<T = any>(data: any): ApiPromise<T> {
        return http({
            url: this.actionUrl.get("modify"),
            method: "POST",
            data: data,
        });
    }

    // 通过 id 查询
    info(id: number): ApiPromise {
        return http({
            url: this.actionUrl.get("info"),
            method: "GET",
            params: { id },
        });
    }

    // 删除
    delete<T = any>(ids: any): ApiPromise<T> {
        return http({
            url: this.actionUrl.get("delete"),
            method: "POST",
            data: {
                ids: ids,
            },
        });
    }
}
