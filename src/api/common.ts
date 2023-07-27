import http from "@/utils/http";
import { upload } from "./controllerUrl";
import { ElNotification, UploadRawFile } from "element-plus";
import { checkFileType } from "@/utils/common";

/**
 * 文件上传
 */
export function fileUpload(fd: FormData, fileSite: fileUploadSaveSite): ApiPromise {
    let errorMsg = "";
    const file = fd.get("file") as UploadRawFile;

    if (!file.name || typeof file.size == "undefined") {
        errorMsg = "未选择文件！";
        // jpg,png,bmp,jpeg,gif,webp,zip,rar,xls,xlsx,doc,docx,wav,mp4,mp3,txt
    } else if (!checkFileType(file.name, file.type)) {
        errorMsg = "不能上传该文件类型";
    }

    if (errorMsg) {
        return new Promise((resolve, reject) => {
            ElNotification({
                type: "error",
                message: errorMsg,
            });
            reject(errorMsg);
        });
    }

    return http({
        url: upload,
        method: "POST",
        data: fd,
        headers: {
            "x-file-site": fileSite,
        },
    });
}

/**
 * 生成一个控制器的：增、删、改、查 的操作url
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
