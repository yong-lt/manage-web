<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-main-scrollbar" :style="mainHeight()">
            <div class="container">
                <router-view></router-view>
            </div>
        </el-scrollbar>
    </el-main>
</template>

<script lang="ts" setup>
import { mainHeight } from "@/utils/common";
</script>

<style scoped>
.layout-main {
    padding: 0 !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.layout-main-scrollbar {
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>
