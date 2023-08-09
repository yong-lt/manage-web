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

            // const ids = formRef.value.getCheckeds();
            // baTable.api.modify({ ...items, menu: ids.join() }).then(res => {
            //     if (res.code === 200) {
            //         ElNotification.success({ message: res.msg });
            //         baTable.form.operate = "";
            //         baTable.getList();
            //     }
            // });
            // const submitCallback = () => {
            //     if (!this.form.items?.id) {
            //         this.api.add({ ...items, menu: ids.join() }).then(() => {
            //             this.onTableHeaderAction("refresh", {});
            //             this.toggleForm();
            //         });
            //     } else {
            //         for (const key in this.form.items) {
            //             if (filedArr && !filedArr.includes(key)) {
            //                 delete this.form.items[key];
            //             }
            //         }
            //         this.api.modify(this.form.items).then(() => {
            //             this.onTableHeaderAction("refresh", {});
            //             this.toggleForm();
            //         });
            //     }
            // };
            // if (form) {
            //     this.form.ref = form;
            //     form.validate(valid => {
            //         if (valid) {
            //             submitCallback();
            //         }
            //     });
            // } else {
            //     submitCallback();
            // }
            // return false;
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
