<template>
    <div class="buttons">
        <el-tooltip v-if="buttons.includes('refresh')" class="box-item" effect="dark" content="刷新" placement="top">
            <el-button type="info" @click="onAction('refresh', { loading: true })">
                <Icon name="Refresh" />
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="buttons.includes('add')" class="box-item" effect="dark" content="添加" placement="top">
            <el-button type="primary" @click="onAction('add', { title: '添加' })">
                <Icon name="Plus" />
                <span>添加</span>
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="buttons.includes('delete')" class="box-item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="onAction('delete')" :disabled="!enableBatchOpt">
                <Icon name="Delete" />
                <span>删除</span>
            </el-button>
        </el-tooltip>
        <el-tooltip
            v-if="buttons.includes('unfold')"
            class="box-item"
            effect="dark"
            :content="baTable.table.expandAll ? '收缩所有' : '展开所有'"
            placement="top"
        >
            <el-button type="warning" @click="onAction('unfold', { unfold: !baTable.table.expandAll })">
                {{ baTable.table.expandAll ? "收缩" : "展开" }}所有
            </el-button>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import baTableClass from "@/utils/baTable";
import { computed, inject } from "vue";

interface Props {
    buttons: HeaderOptButton[];
}

const props = withDefaults(defineProps<Props>(), {
    buttons: () => ["refresh", "add", "delete", "unfold"],
});

const onAction = (event: string, data: anyObj = {}) => {
    baTable.onTableHeaderAction(event, data);
};

const enableBatchOpt = computed(() => (baTable.table.selection!.length > 0 ? true : false));

const baTable = inject("baTable") as baTableClass;
</script>

<style scoped>
.buttons {
    margin-bottom: 20px;
}
</style>
