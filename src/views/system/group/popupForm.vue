<template>
    <el-dialog :close-on-click-modal="false" :model-value="baTable.form.operate ? true : false" width="400px" @close="baTable.toggleForm">
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="上级">
                <el-input v-model="baTable.form.items!.parent_id" />
            </el-form-item>
            <el-form-item label="角色名称">
                <el-input v-model="baTable.form.items!.name" />
            </el-form-item>
            <el-form-item label="权限">
                <el-tree
                    ref="treeRef"
                    :key="state.treeKey"
                    :data="state.menuRules"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="state.defaultKeys"
                    default-expand-all
                    :props="defaultProps"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="baTable.toggleForm">取消</el-button>
                <el-button type="primary" @click="baTable.onSubmit(formRef)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref, watch } from "vue";

import baTableClass from "@/utils/baTable";
import { ElForm, ElTree } from "element-plus";
import { usePermission } from "@/stores/permission";
import { Router } from "@/stores/interface";

const defaultProps = {
    children: "children",
    label: "title",
};

const baTable = inject("baTable") as baTableClass;

const formRef = ref<InstanceType<typeof ElForm>>();
const treeRef = ref<InstanceType<typeof ElTree>>();

const state = reactive<{
    menuRules: Router;
    defaultKeys: number[];
    treeKey: number;
}>({
    menuRules: [],
    defaultKeys: [],
    treeKey: 0,
});

const permission = usePermission();

onMounted(() => {
    state.menuRules = permission.getRouter;
});

watch(
    () => baTable.form.items?.menu,
    val => {
        state.defaultKeys = val;
        state.treeKey = Date.now();
    },
    {
        deep: true,
    }
);
const getCheckeds = () => {
    return treeRef.value!.getCheckedKeys().concat(treeRef.value!.getHalfCheckedKeys());
};
defineExpose({
    getCheckeds,
});
</script>

<style scoped lang="scss"></style>
