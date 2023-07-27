import { defineStore } from "pinia";
import { getListApi } from "@/api/menu";
import type { Permissions,Menu } from "./interface";
import { addRouterItem, generaMenu } from "@/utils/router";


export const usePermission = defineStore("permission", {
    state: (): Permissions => ({
        router: [],
        isComplete: false,
    }),
    getters: {
        getRouter: state => state.router,
    },
    actions: {
        generateRoutes() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await getListApi<Menu[]>();
                    const resultMenu: Menu[] = []
                    generaMenu(resultMenu, res.data);
                    addRouterItem(resultMenu)
                    this.$state = { ...this.$state, isComplete: true, router: resultMenu }
                    resolve(resultMenu)
                } catch (error) {
                    reject(error);
                }
            });
        },
    },
});
