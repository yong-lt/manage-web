<template>
    <TableHeader :buttons="['refresh', 'add', 'delete']" />
    <Table ref="tableRef" />
    <popupForm ref="formRef" />
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from "vue";

import Table from "@/components/table/index.vue";
import TableHeader from "@/components/table/components/header/index.vue";
import popupForm from "./popupForm.vue";
import { ElNotification } from "element-plus";
import baTableClass from "@/utils/baTable";
import { baTableApi } from "@/api/common";
import { Users } from "@/api/controllerUrl";
import { defaultOptButtons } from "@/components/table";

const tableRef = ref();
const formRef = ref();
const baTable = new baTableClass(
    new baTableApi(Users),
    {
        column: [
            { type: "selection", align: "center" },
            {
                label: "ID",
                prop: "id",
                width: "100",
                align: "left",
            },
            { label: "用户账号", prop: "username", width: "", align: "left" },
            { label: "用户昵称", prop: "nickname", width: "", align: "left" },
            { label: "用户权限", prop: "auth_name", width: "", align: "left" },
            { label: "创建时间", prop: "create_time", width: "", align: "left" },
            { label: "更新时间", prop: "update_time", width: "", align: "left" },
            { label: "操作", width: "130", align: "center", render: "buttons", buttons: defaultOptButtons() },
        ],
    },
    {}
);
provide("baTable", baTable);
onMounted(() => {
    baTable.table.ref = tableRef.value;
    baTable.mount();
});
</script>

<style scoped lang="scss"></style>
