<template>
    <el-aside class="layout-aside">
        <menuVertical />

        <div class="collapse" @click="onMenuCollapse">
            <Icon
                v-if="configStore.layout.layoutMode === 'Default'"
                :name="configStore.layout.menuCollapse ? 'Expand' : 'Fold'"
                :class="configStore.layout.menuCollapse ? 'unfold' : ''"
                :color="configStore.getColorVal('menuCollapseColor')"
                size="18"
                class="fold"
            />
        </div>
    </el-aside>
</template>

<script lang="ts" setup>
import { useConfig } from "@/stores/config";
import menuVertical from "./menu/menuVertical.vue";
import { computed } from "vue";

const configStore = useConfig();

const onMenuCollapse = () => {
    configStore.setLayout("menuCollapse", !configStore.layout.menuCollapse);
};

const menuWidth = computed(() => configStore.getMenuWidth());
</script>

<style scoped lang="scss">
.layout-aside {
    background: v-bind("configStore.getColorVal('menuBackgroundColor')");
    margin: 16px 0 16px 16px;
    height: calc(100vh - 32px);
    box-shadow: var(--el-box-shadow-light);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    transition: width 0.3s ease;
    width: v-bind(menuWidth);
    position: relative;
}

.collapse {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 45px;
    font-size: 24px;
    position: absolute;
    bottom: 0;
    background-color: v-bind('configStore.getColorVal("headerBarBackground")');

    &:hover {
        background-color: v-bind('configStore.getColorVal("headerBarHoverBackground")');
    }
}
.collapse .icon {
    font-size: 24px !important;
}
</style>
