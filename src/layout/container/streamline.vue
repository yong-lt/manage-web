<template>
    <div class="common-layout">
        <el-container>
            <el-container class="content-wrapper">
                <Header />
                <Main />
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import Main from "@/layout/main/index.vue";
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
