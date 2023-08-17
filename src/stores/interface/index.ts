import { RouteRecordRaw } from "vue-router";

export interface UserAccount {
    username: string;
    password: string;
    remember: boolean;
}

export type Router = RouteRecordRaw[];

export type Menu = RouteRecordRaw & {
    id: number;
    type: string;
    sort: string;
    title?: string;
    icon?: string;
};

export interface Permissions {
    router: Router;
}

export interface Layout {
    layoutMode: string;
    menuCollapse: boolean;
    isDark: boolean;
    showDrawer: boolean;
    menuWidth: number;
    menuColor: string[];
    menuActiveBackground: string[];
    menuBackgroundColor: string[];
    menuCollapseColor: string[];
    headerBarTabColor: string[];
    headerBarBackground: string[];
    headerBarHoverBackground: string[];
}
