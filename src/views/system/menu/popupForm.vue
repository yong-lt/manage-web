<template>
    <el-dialog class="ba-operate-dialog" :close-on-click-modal="false" :model-value="baTable.form.operate ? true : false" @close="baTable.toggleForm">
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="上级菜单">
                <el-select v-model="baTable.form.items!.parent_id" style="width: 100%" @visible-change="onMenuSelect" placeholder="无上级则不选">
                    <el-option v-for="item in state.menuTree" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="菜单类型">
                <el-radio-group v-model="baTable.form.items!.type">
                    <el-radio label="menu_dir" border>菜单目录</el-radio>
                    <el-radio label="menu" border>菜单项</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model="baTable.form.items!.title" />
            </el-form-item>
            <el-form-item label="菜单图标" prop="icon">
                <el-input v-model="baTable.form.items!.icon" />
            </el-form-item>
            <el-form-item label="菜单组件" prop="component">
                <el-input v-model="baTable.form.items!.component" />
            </el-form-item>
            <el-form-item label="菜单顺序" prop="sort">
                <el-input v-model="baTable.form.items!.sort" type="number" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="baTable.toggleForm">取消</el-button>
                <el-button type="primary" @click="baTable.onSubmit(formRef, ['id', 'title', 'icon', 'sort', 'component', 'parent_id', 'type'])"
                    >确定</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from "vue";

import baTableClass from "@/utils/baTable";
import { ElForm, FormRules } from "element-plus";
import { buildValidatorData } from "@/utils/validate";

const baTable = inject("baTable") as baTableClass;

const formRef = ref<InstanceType<typeof ElForm>>();

const state = reactive<{
    menuTree: any;
}>({
    menuTree: [],
});

// 表单验证规则
const rules = reactive<FormRules>({
    title: [buildValidatorData({ name: "required", message: "请输入菜单名称" })],
    icon: [buildValidatorData({ name: "required", message: "请输入菜单图标" })],
    component: [buildValidatorData({ name: "required", message: "请输入菜单组件" }), buildValidatorData({ name: "menuComponentPath" })],
    sort: [buildValidatorData({ name: "required", message: "请输入菜单顺序" })],
});

const onMenuSelect = (val: boolean) => {
    if (val) {
        baTable.api.list({ parent_id: 0 }).then(res => {
            state.menuTree = res.data;
        });
    }
};
</script>

<style scoped lang="scss"></style>
