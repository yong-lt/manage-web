import { RouteRecordRaw } from "vue-router";

export const asyncRouter: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        component: () => import('@/layout/index.vue'),
        redirect: "/dashboard",
        children: []
    },
];
