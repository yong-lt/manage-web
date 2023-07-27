<template>
    <el-dialog :close-on-click-modal="false" :model-value="baTable.form.operate ? true : false" width="400px" @close="baTable.toggleForm">
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="用户账号">
                <el-input v-model="baTable.form.items!.username" />
            </el-form-item>
            <el-form-item label="用户权限">
                <el-select v-model="baTable.form.items!.auth" class="m-2" placeholder="Select" @visible-change="visibleChange">
                    <el-option v-for="item in state.options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
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
import { ElForm } from "element-plus";
import { baTableApi } from "@/api/common";
import { Group } from "@/api/controllerUrl";

const baTable = inject("baTable") as baTableClass;
const state = reactive<{
    options: { id: number; name: string }[];
}>({
    options: [],
});
const formRef = ref<InstanceType<typeof ElForm>>();

const visibleChange = (val: boolean) => {
    if (val) new baTableApi(Group).list(true).then(res => (state.options = res.data));
};

defineExpose({
    options: state.options,
});
</script>

<style scoped lang="scss"></style>
