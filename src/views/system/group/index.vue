<template>
    <TableHeader />
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
import { Group } from "@/api/controllerUrl";
import { defaultOptButtons } from "@/components/table";
const tableRef = ref();
const formRef = ref();
const baTable = new baTableClass(
    new baTableApi(Group),
    {
        column: [
            { type: "selection", align: "center" },
            { label: "角色名称", prop: "name", width: "", align: "left" },
            { label: "操作", width: "130", align: "center", render: "buttons", buttons: defaultOptButtons() },
        ],
    },
    {
        defaultItem: {
            parent_id: 0,
        },
    },
    {
        onSubmit({ form, items }) {
            const ids = formRef.value.getCheckeds();
            baTable.api.modify({ ...items, menu: ids.join() }).then(res => {
                if (res.code === 200) {
                    ElNotification.success({ message: res.msg });
                    baTable.form.operate = "";
                    baTable.getList();
                }
            });
            return false;
        },
    }
);
provide("baTable", baTable);
onMounted(() => {
    baTable.table.ref = tableRef.value;
    baTable.mount();
});
</script>

<style scoped lang="scss"></style>
