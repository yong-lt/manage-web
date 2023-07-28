<template>
    <div class="layouts-menu-horizontal">
        <el-scrollbar ref="horizontalMenusRef" class="horizontal-menus-scrollbar">
            <el-menu class="menu-horizontal" mode="horizontal" :default-active="state.defaultActive">
                <template v-for="menu in state.menus">
                    <template v-if="menu.children && menu.children.length > 0">
                        <el-sub-menu :index="menu.path" :key="menu.path">
                            <template #title>
                                <Icon :color="configStore.getColorVal('menuColor')" :name="menu.meta?.icon" />
                                <span>{{ menu.meta?.title }}</span>
                            </template>
                            <menu-tree :menus="menu.children"></menu-tree>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item v-blur :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
                            <Icon :color="configStore.getColorVal('menuColor')" :name="menu.meta?.icon" />
                            <span>{{ menu.meta?.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
        <NavMenus />
    </div>
</template>

<script setup lang="ts">
import { useConfig } from "@/stores/config";
import { usePermission } from "@/stores/permission";
import { onMounted, reactive } from "vue";
import { RouteLocationNormalizedLoaded, RouteRecordRaw, onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import NavMenus from "../navMenus.vue";
import MenuTree from "./menuTree.vue";

const configStore = useConfig();
const permissionStore = usePermission();
const route = useRoute();
const router = useRouter();

const state = reactive<{
    defaultActive: string;
    menus: RouteRecordRaw[];
}>({
    defaultActive: "",
    menus: [],
});

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path;
};

const onClickMenu = (menu: RouteRecordRaw) => {
    router.push(menu.path);
};

onMounted(() => {
    state.menus = permissionStore.getRouter;
    currentRouteActive(route);
});

onBeforeRouteUpdate(to => {
    currentRouteActive(to);
});
</script>

<style scoped lang="scss">
.layouts-menu-horizontal {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 60px;
    background-color: var(--ba-bg-color-overlay);
    border-bottom: solid 1px var(--el-color-info-light-8);
}
.horizontal-menus-scrollbar {
    flex: 1;
}
.menu-horizontal {
    border: none;
}
.el-sub-menu .icon,
.el-menu-item .icon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
}
.is-active .icon {
    color: var(--el-menu-active-color) !important;
}

.el-menu-item.is-active {
    background-color: v-bind('configStore.getColorVal("menuActiveBackground")');
}
</style>
