<template>
    <div class="table-header buttons">
        <el-tooltip v-if="buttons.includes('refresh')" effect="dark" content="刷新" placement="top">
            <el-button type="info" class="table-header-operate" @click="onAction('refresh', { loading: true })">
                <Icon name="Refresh" />
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="buttons.includes('add')" effect="dark" content="添加" placement="top">
            <el-button type="primary" class="table-header-operate" @click="onAction('add', { title: '添加' })">
                <Icon name="Plus" />
                <span>添加</span>
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="buttons.includes('delete')" effect="dark" content="删除" placement="top">
            <el-button type="danger" class="table-header-operate" @click="onAction('delete')" :disabled="!enableBatchOpt">
                <Icon name="Delete" />
                <span>删除</span>
            </el-button>
        </el-tooltip>
        <el-tooltip v-if="buttons.includes('unfold')" effect="dark" :content="baTable.table.expandAll ? '收缩所有' : '展开所有'" placement="top">
            <el-button type="warning" class="table-header-operate" @click="onAction('unfold', { unfold: !baTable.table.expandAll })"> {{ baTable.table.expandAll ? "收缩" : "展开" }}所有 </el-button>
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

<style scoped lang="scss">
.buttons {
    width: 100%;
    height: auto;
    background-color: var(--ylt-bg-color-overlay);
    padding: 13px 15px;
}
</style>
