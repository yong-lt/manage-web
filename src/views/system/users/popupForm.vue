<template>
    <el-dialog
        class="ba-operate-dialog"
        :close-on-click-modal="false"
        :model-value="baTable.form.operate ? true : false"
        @close="baTable.toggleForm"
    >
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="用户账号" prop="username">
                <el-input v-model="baTable.form.items!.username" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input v-model="baTable.form.items!.nickname" />
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="baTable.form.items!.password" />
            </el-form-item>
            <el-form-item label="用户权限" prop="auth">
                <el-select
                    v-model="baTable.form.items!.auth"
                    label="auth_name"
                    style="width: 100%"
                    class="m-2"
                    placeholder="选择权限"
                    @visible-change="visibleChange"
                >
                    <el-option v-for="item in state.options" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="baTable.toggleForm">取消</el-button>
                <el-button type="primary" @click="baTable.onSubmit(formRef, ['id', 'username', 'nickname', 'password', 'auth'])">
                    确定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref, watch } from "vue";

import baTableClass from "@/utils/baTable";
import { ElForm, FormRules } from "element-plus";
import { buildValidatorData } from "@/utils/validate";
import { baTableApi } from "@/api/common";
import { Group } from "@/api/controllerUrl";

type Options = { id: number; name: string }[];

const baTable = inject("baTable") as baTableClass;
const state = reactive<{
    options: Options;
}>({
    options: [],
});

// 表单验证规则
const rules = reactive<FormRules>({
    username: [buildValidatorData({ name: "required", message: "请输入用户名" }), buildValidatorData({ name: "account" })],
    nickname: [buildValidatorData({ name: "required", message: "请输入昵称" }), buildValidatorData({ name: "account" })],
    password: [buildValidatorData({ name: "password" })],
    auth: [buildValidatorData({ name: "required", message: "请选择用户权限" })],
});

const formRef = ref<InstanceType<typeof ElForm>>();

const visibleChange = (val: boolean) => {
    state.options = [];
    if (val) {
        new baTableApi(Group).list({ isTree: 1 }).then(res => {
            state.options = res.data;
        });
    }
};

// 下拉框赋值初始值
watch(
    () => baTable.form.items,
    val => {
        if (Object.keys(val!).length) {
            state.options = [{ id: val!.auth, name: val!.auth_name }];
        }
    },
    {
        deep: true,
    }
);

defineExpose({
    options: state.options,
});
</script>

<style scoped lang="scss"></style>
