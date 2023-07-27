<template>
    <el-table
        ref="tableRef"
        :data="baTable.table.data"
        :row-key="baTable.table.rowKey"
        stripe
        style="width: 100%"
        :border="true"
        v-loading="baTable.table.loading"
        @selection-change="handleSelectionChange"
        :default-expand-all="baTable.table.expandAll"
    >
        <template v-for="(item, key) in baTable.table.column" :key="key">
            <Column :attr="item">
                <template v-if="item.render" #default="scope">
                    <FieldRender :field="item" :row="scope.row" />
                </template>
            </Column>
        </template>
    </el-table>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import Column from "./components/column/index.vue";
import FieldRender from "./components/fieldRender/index.vue";
import baTableClass from "@/utils/baTable";
import { ElTable } from "element-plus";

const tableRef = ref<InstanceType<typeof ElTable>>();

const baTable = inject("baTable") as baTableClass;

const handleSelectionChange = (selection: TableRow[]) => {
    baTable.onTableAction("selection-change", undefined, selection);
};
/*
 * 设置折叠所有-递归
 */
const setUnFoldAll = (children: TableRow[], unfold: boolean) => {
    for (const key in children) {
        tableRef.value?.toggleRowExpansion(children[key], unfold);
        if (children[key].children) {
            setUnFoldAll(children[key].children!, unfold);
        }
    }
};
/*
 * 折叠所有
 */
const unFoldAll = (unfold: boolean) => {
    setUnFoldAll(baTable.table.data!, unfold);
};

defineExpose({
    unFoldAll,
});
</script>

<style></style>
