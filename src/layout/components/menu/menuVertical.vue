<template>
    <el-scrollbar ref="horizontalMenusRef" class="menus-scrollbar">
        <el-menu class="el-menu-vertical-demo" :default-active="active" :collapse="configStore.layout.menuCollapse">
            <menu-tree :menus="menus.list" />
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { usePermission } from "@/stores/permission";
import { onMounted, reactive, ref } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import MenuTree from "./menuTree.vue";
import { useConfig } from "@/stores/config";

const permission = usePermission();
const configStore = useConfig();

const menus = reactive<{
    list: RouteRecordRaw[];
}>({
    list: [],
});

const active = ref("");

const route = useRoute();

onMounted(() => {
    menus.list = permission.getRouter;
    active.value = route.path;
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
