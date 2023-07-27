import { createRouter, createWebHashHistory,RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
