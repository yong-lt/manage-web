<template>
    <el-drawer v-model="configStore.layout.showDrawer" title="系统配置" direction="rtl" append-to-body size="310px">
        <el-form>
            <el-divider border-style="dashed">布局方式</el-divider>
            <div class="layout-mode-box-style">
                <el-row class="layout-mode-box-style-row" :gutter="10">
                    <el-col :span="12">
                        <div
                            @click="configStore.setLayoutMode('Default')"
                            class="layout-mode-style default"
                            :class="configStore.layout.layoutMode == 'Default' ? 'active' : ''"
                        >
                            <div class="layout-mode-style-box">
                                <div class="layout-mode-style-aside"></div>
                                <div class="layout-mode-style-container-box">
                                    <div class="layout-mode-style-header"></div>
                                    <div class="layout-mode-style-container"></div>
                                </div>
                            </div>
                            <div class="layout-mode-style-name">默认</div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div
                            @click="configStore.setLayoutMode('Streamline')"
                            class="layout-mode-style streamline"
                            :class="configStore.layout.layoutMode == 'Streamline' ? 'active' : ''"
                        >
                            <div class="layout-mode-style-box">
                                <div class="layout-mode-style-container-box">
                                    <div class="layout-mode-style-header"></div>
                                    <div class="layout-mode-style-container"></div>
                                </div>
                            </div>
                            <div class="layout-mode-style-name">单栏</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-divider border-style="dashed">全局</el-divider>
            <el-form-item label="暗黑模式">
                <el-switch v-model="configStore.layout.isDark" @change="toggleDark" />
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script lang="ts" setup>
import { useConfig } from "@/stores/config";
import toggleDark from "@/utils/useDark";

const configStore = useConfig();
</script>

<style scoped lang="scss">
.layout-mode-styles-box {
    padding: 20px;
}
.layout-mode-box-style-row {
    margin-bottom: 15px;
}
.layout-mode-style {
    position: relative;
    height: 100px;
    border: 1px solid var(--el-border-color-light);
    border-radius: var(--el-border-radius-small);
    &:hover,
    &.active {
        border: 1px solid var(--el-color-primary);
    }
    .layout-mode-style-name {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-color-primary-light-5);
        border-radius: 50%;
        height: 50px;
        width: 50px;
        border: 1px solid var(--el-color-primary-light-3);
    }
    .layout-mode-style-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    &.default {
        display: flex;
        align-items: center;
        justify-content: center;
        .layout-mode-style-aside {
            width: 18%;
            height: 90%;
            background-color: var(--el-border-color-lighter);
        }
        .layout-mode-style-container-box {
            width: 68%;
            height: 90%;
            margin-left: 4%;
            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color-lighter);
            }
            .layout-mode-style-container {
                width: 100%;
                height: 85%;
                background-color: var(--el-border-color-extra-light);
                margin-top: 5%;
            }
        }
    }

    &.streamline {
        display: flex;
        align-items: center;
        justify-content: center;
        .layout-mode-style-container-box {
            width: 100%;
            height: 100%;
            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color);
            }
            .layout-mode-style-container {
                width: 100%;
                height: 90%;
                background-color: var(--el-border-color-extra-light);
            }
        }
    }
}
</style>
