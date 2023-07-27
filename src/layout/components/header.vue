<template>
    <el-header class="layout-header">
        <component :is="config.layout.layoutMode + 'NavBar'"></component>
    </el-header>
</template>
<script setup lang="ts">
import { useConfig } from "@/stores/config";
import DefaultNavBar from "@/layout/components/navBar/default.vue";
import StreamlineNavBar from "@/layout/components/menu/menuHorizontal.vue";

const config = useConfig();
</script>

<script lang="ts">
export default {
    components: { DefaultNavBar, StreamlineNavBar },
};
</script>

<style scoped lang="scss">
.layout-header {
    height: 70px;
    padding: 0;
}
</style>
