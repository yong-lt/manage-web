<template>
    <TableHeader />
    <Table ref="tableRef" />
    <popupForm />
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from "vue";

import Table from "@/components/table/index.vue";
import TableHeader from "@/components/table/components/header/index.vue";
import popupForm from "./popupForm.vue";

import baTableClass from "@/utils/baTable";
import { baTableApi } from "@/api/common";
import { Menu } from "@/api/controllerUrl";
import { defaultOptButtons } from "@/components/table";
const tableRef = ref();
const baTable = new baTableClass(
    new baTableApi(Menu),
    {
        column: [
            { type: "selection", align: "center" },
            { label: "菜单名称", prop: "title", width: "", align: "left" },
            { label: "菜单图标", prop: "icon", width: "", align: "center", render: "icon" },
            { label: "菜单组件", prop: "component", width: "", align: "center" },
            { label: "菜单顺序", prop: "sort", width: "", align: "center" },
            {
                label: "菜单类型",
                prop: "type",
                width: "",
                align: "center",
                render: "tag",
                custom: { menu: { type: "danger", name: "菜单项" }, menu_dir: { type: "success", name: "菜单目录" } },
            },
            { label: "操作", width: "130", align: "center", render: "buttons", buttons: defaultOptButtons() },
        ],
    },
    {
        defaultItem: {
            parent_id: 0,
            type: "menu",
        },
    }
);
provide("baTable", baTable);
onMounted(() => {
    baTable.table.ref = tableRef.value;
    baTable.mount({ isSystem: 1 });
});
</script>

<style scoped lang="scss"></style>
