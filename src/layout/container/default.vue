<template>
    <div class="common-layout">
        <el-container>
            <Aside />
            <el-container class="content-wrapper">
                <Header />
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Aside from "@/layout/components/aside.vue";
import Header from "@/layout/components/header.vue";
</script>

<style scoped lang="scss">
.common-layout,
.el-container {
    height: 100%;
}

.content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
