<template>
    <template v-for="menu in props.menus">
        <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu :index="menu.path" :key="menu.path">
                <template #title>
                    <Icon :color="configStore.getColorVal('menuColor')" :name="menu.meta?.icon"></Icon>
                    <span>{{ menu.meta?.title }}</span>
                </template>
                <menu-tree :menus="menu.children"></menu-tree>
            </el-sub-menu>
        </template>
        <template v-else>
            <el-menu-item :index="menu.path" :key="menu.path" @click="onClickMenu(menu)">
                <Icon :color="configStore.getColorVal('menuColor')" :name="menu.meta?.icon"></Icon>
                <span>{{ menu.meta?.title }}</span>
            </el-menu-item>
        </template>
    </template>
</template>

<script lang="ts" setup>
import { useConfig } from "@/stores/config";
import { RouteRecordRaw, useRouter } from "vue-router";

interface Props {
    menus: RouteRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
    menus: () => [],
});

const router = useRouter();
const configStore = useConfig();

const onClickMenu = (menu: RouteRecordRaw) => {
    router.push(menu.path);
};
</script>

<style scoped lang="scss">
.el-sub-menu .icon,
.el-menu-item .icon {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
}
.is-active > .icon {
    color: var(--el-menu-active-color) !important;
}
.el-menu-item.is-active {
    background-color: v-bind('configStore.getColorVal("menuActiveBackground")');
}
</style>
