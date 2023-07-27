import type { App } from "vue";
import * as elIcons from "@element-plus/icons-vue";
import Icon from "@/components/icon/index.vue";

export function registerIcons(app: App) {
    /*
     * 全局注册 Icon
     * 使用方式: <Icon name="name" size="size" color="color" />
     */
    app.component("Icon", Icon);

    /*
     * 全局注册element Plus的icon
     */
    const icons = elIcons as any;
    for (const i in icons) {
        app.component(icons[i].name, icons[i]);
    }
}

/**
 * 检测文件类型是否合法
 * @param {string} fileName 文件名
 * @param {string} fileType 文件类型
 */
export function checkFileType(fileName: string, fileType: string) {
    console.log(fileName, fileType);

    const type = "jpg,png,bmp,jpeg,gif,webp,zip,rar,xls,xlsx,doc,docx,wav,mp4,mp3,txt".split(",");
    if (!fileName) return false;

    const fileSuffix = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    // 如果文件名带有后缀
    if (type.includes(fileSuffix) || type.includes("." + fileSuffix)) {
        return true;
    }
    // 文件名没带后缀，判断文件后缀
    if (fileType) {
        const fileTypeTemp = fileType.toLowerCase().split("/");
        if (type.includes(fileTypeTemp[1])) {
            return true;
        }
    }
    return false;
}
