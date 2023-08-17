import { defineStore } from "pinia";
import { getAuthMenu } from "@/api/menu";
import type { Permissions, Menu } from "./interface";
import { addRouterItem, generaMenu } from "@/utils/router";

export const usePermission = defineStore("permission", {
    state: (): Permissions => ({
        router: [],
    }),
    getters: {
        getRouter: state => state.router,
    },
    actions: {
        generateRoutes() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await getAuthMenu<Menu[]>();
                    const resultMenu: Menu[] = [];
                    generaMenu(resultMenu, res.data);
                    addRouterItem(resultMenu);
                    this.$state = { router: resultMenu };
                    resolve(resultMenu);
                } catch (error) {
                    reject(error);
                }
            });
        },
    },
});
