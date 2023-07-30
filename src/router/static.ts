import { RouteRecordRaw } from "vue-router";

export const asyncRouter: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        component: () => import("@/layout/index.vue"),
        redirect: "/dashboard/index",
        children: [
            {
                path: "/404",
                component: () => import("@/views/404.vue"),
            },
            {
                path: "/:path(.*)*",
                redirect: "/404",
            },
        ],
    },
];
