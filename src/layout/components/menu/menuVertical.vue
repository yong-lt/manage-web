<template>
    <el-scrollbar ref="horizontalMenusRef" class="menus-scrollbar">
        <el-menu class="el-menu-vertical-demo" :default-active="state.defaultActive" :collapse="configStore.layout.menuCollapse">
            <menu-tree :menus="state.list" />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { usePermission } from "@/stores/permission";
import { onMounted, reactive } from "vue";
import { RouteLocationNormalizedLoaded, RouteRecordRaw, onBeforeRouteUpdate, useRoute } from "vue-router";
import MenuTree from "./menuTree.vue";
import { useConfig } from "@/stores/config";

const permission = usePermission();
const configStore = useConfig();

const state = reactive<{
    list: RouteRecordRaw[];
    defaultActive: string;
}>({
    list: [],
    defaultActive: "",
});

const route = useRoute();

// 激活当前路由的菜单
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
    state.defaultActive = currentRoute.path;
};

onMounted(() => {
    state.list = permission.getRouter;
    currentRouteActive(route);
});

onBeforeRouteUpdate(to => {
    currentRouteActive(to);
});
</script>

<style scoped lang="scss">
.menus-scrollbar {
    height: calc(100vh - 30px);
}
.el-menu-vertical-demo {
    border: 0;
}
</style>
