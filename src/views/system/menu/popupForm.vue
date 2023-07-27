<template>
    <el-dialog :close-on-click-modal="false" :model-value="baTable.form.operate ? true : false" width="400px" @close="baTable.toggleForm">
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="上级菜单">
                <el-input v-model="baTable.form.items!.parent_id" />
            </el-form-item>
            <el-form-item label="菜单类型">
                <el-radio-group v-model="baTable.form.items!.type">
                    <el-radio label="menu_dir" border>菜单目录</el-radio>
                    <el-radio label="menu" border>菜单项</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称">
                <el-input v-model="baTable.form.items!.title" />
            </el-form-item>
            <el-form-item label="菜单图标">
                <el-input v-model="baTable.form.items!.icon" />
            </el-form-item>
            <el-form-item label="菜单组件">
                <el-input v-model="baTable.form.items!.component" />
            </el-form-item>
            <el-form-item label="菜单路径">
                <el-input v-model="baTable.form.items!.path" />
            </el-form-item>
            <el-form-item label="菜单顺序">
                <el-input v-model="baTable.form.items!.sort" />
            </el-form-item>
            <el-form-item label="路由名称">
                <el-input v-model="baTable.form.items!.name" />
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
import { inject, onMounted, ref } from "vue";

import baTableClass from "@/utils/baTable";
import { ElForm } from "element-plus";

const baTable = inject("baTable") as baTableClass;

const formRef = ref<InstanceType<typeof ElForm>>();
</script>

<style scoped lang="scss"></style>
