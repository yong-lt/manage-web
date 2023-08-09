<template>
    <el-dialog
        class="ba-operate-dialog"
        :close-on-click-modal="false"
        :model-value="baTable.form.operate ? true : false"
        width="400px"
        @close="baTable.toggleForm"
    >
        <template #header>
            <div class="my-header">{{ baTable.form.title }}</div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="baTable.form.items" label-width="120px" v-loading="baTable.form.loading">
            <el-form-item label="上级">
                <el-select
                    v-model="baTable.form.items!.parent_id"
                    style="width: 100%"
                    @visible-change="onGroupSelect"
                    placeholder="无上级则不选"
                >
                    <el-option v-for="item in state.groupList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="角色名称">
                <el-input v-model="baTable.form.items!.name" />
            </el-form-item>
            <el-form-item prop="ids" label="权限">
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
                <el-button type="primary" @click="baTable.onSubmit(formRef, ['id', 'name', 'menu', 'parent_id'])">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive, ref, watch } from "vue";

import baTableClass from "@/utils/baTable";
import { ElForm, ElTree, FormRules } from "element-plus";
import { Router } from "@/stores/interface";
import { getListApi } from "@/api/menu";
import { getFormatList } from "@/api/group";
import { buildValidatorData } from "@/utils/validate";

type Options = { id: number; name: string }[];

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
    groupList: Options;
}>({
    menuRules: [],
    defaultKeys: [],
    treeKey: 0,
    groupList: [],
});

// 表单验证规则
const rules = reactive<FormRules>({
    name: [buildValidatorData({ name: "required", message: "请输入角色名称" })],
});

onMounted(() => {
    getListApi({ isSystem: 1 }).then(res => {
        state.menuRules = res.data;
    });
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

watch(
    () => baTable.form.items,
    val => {
        if (val!.id) {
            state.groupList = [{ id: val!.parent_id, name: val!.name }];
        }
    },
    {
        deep: true,
    }
);

const onGroupSelect = (val: boolean) => {
    state.groupList = [];
    if (val) {
        getFormatList<Options>().then(res => (state.groupList = res.data));
    }
};
const getCheckeds = () => {
    return treeRef.value!.getCheckedKeys().concat(treeRef.value!.getHalfCheckedKeys());
};
defineExpose({
    getCheckeds,
});
</script>

<style scoped lang="scss"></style>
