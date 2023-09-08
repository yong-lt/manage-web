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
import { getArrayKey } from "@/utils/common";

const tableRef = ref();
const formRef = ref();

const optButtons = defaultOptButtons(["edit", "delete"]);

const baTable = new baTableClass(
    new baTableApi(Group),
    {
        expandAll: true,
        column: [
            { type: "selection", align: "center" },
            { label: "角色名称", prop: "name", width: "", align: "left" },
            { label: "操作", width: "130", align: "center", render: "buttons", buttons: optButtons },
        ],
    },
    {},
    {
        onSubmit({ form, items, filedArr }) {
            const ids = formRef.value.getCheckeds();
            const submitCallback = () => {
                if (!items.id) {
                    baTable.api.add({ ...items, menu: ids.join() }).then(() => {
                        baTable.onTableHeaderAction("refresh", {});
                        baTable.toggleForm();
                    });
                } else {
                    for (const key in items) {
                        if (filedArr && !filedArr.includes(key)) {
                            delete items[key];
                        }
                    }
                    baTable.api.modify({ ...items, menu: ids.join() }).then(() => {
                        baTable.onTableHeaderAction("refresh", {});
                        baTable.toggleForm();
                    });
                }
            };

            if (form) {
                form.validate(valid => {
                    if (valid) {
                        submitCallback();
                    }
                });
            }

            return false;
        },
    },
    {
        getIndex: () => {
            let buttonsKey = getArrayKey(baTable.table.column, "render", "buttons");

            baTable.table.column![buttonsKey].buttons!.forEach((value: OptButton) => {
                value.display = row => {
                    console.log(row);

                    return row.id != 1;
                };
            });
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
