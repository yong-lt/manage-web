<template>
    <component :is="configStore.layout.layoutMode"></component>
</template>

<script lang="ts" setup>
import Default from "@/layout/container/default.vue";
import Streamline from "@/layout/container/streamline.vue";

import { useConfig } from "@/stores/config";

const configStore = useConfig();
</script>

<script lang="ts">
export default {
    components: { Default, Streamline },
};
</script>
