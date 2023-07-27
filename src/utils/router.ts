import { Menu } from "@/stores/interface";
import { RouteRecordName, RouteRecordRaw } from "vue-router";
import router from "@/router/index";
import { asyncRouter } from "@/router/static";

const modules = import.meta.glob("../views/**/*.vue");

export function generaMenu(resultMenu: Menu[], router: Menu[]) {
    router.forEach(item => {
        const menu: Menu = {
            id: item.id,
            path: item.path,
            name: item.name,
            component: modules[`../views${item.component}.vue`],
            type: item.type,
            sort: item.sort,
            children: [],
            title: item.title,
            meta: {
                title: item.title,
                icon: item.icon,
            },
        };

        if (item.children && item.children.length > 0) {
            generaMenu(menu.children as Menu[], item.children as Menu[]);
        }
        resultMenu.push(menu);
    });
}

export function addRouterItem(menu: RouteRecordRaw[]) {
    router.addRoute(asyncRouter[0]);
    menu.forEach(item => router.addRoute(asyncRouter[0].name as RouteRecordName, item));
}
