<template>
    <div class="container">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="user-info">
                    <div v-show="!state.showModifyBox" class="base-info">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :auto-upload="false"
                            @change="onAvatarBeforeUpload"
                            accept="image/gif, image/jpg, image/jpeg, image/bmp, image/png, image/webp"
                        >
                            <el-image :src="userStore.getUserInfo.avatar_url" class="avatar">
                                <template #error>
                                    <div class="image-slot">
                                        <Icon size="30" color="#c0c4cc" name="el-icon-Picture" />
                                    </div>
                                </template>
                            </el-image>
                        </el-upload>
                        <div class="nickname">{{ userStore.getUserInfo.nickname }}</div>
                        <div class="create-time">最后登录：{{ userStore.getUserInfo.last_login_time }}</div>
                    </div>

                    <div class="other-info">
                        <el-form
                            :model="state.form"
                            :rules="rules"
                            label-width="120px"
                            label-position="top"
                            ref="formRef"
                            :key="state.formKey"
                        >
                            <el-form-item label="用户名">
                                <el-input disabled v-model="state.form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="nickname">
                                <el-input v-model="state.form.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="password">
                                <el-input v-model="state.form.password" placeholder="不修改则不填写"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(formRef)" :loading="state.buttonLoading">保存修改</el-button>
                                <el-button @click="onResetForm(formRef)">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { fileUpload } from "@/api/common";
import { getUserInfo, modifyUserInfo } from "@/api/user";
import { useUserInfo } from "@/stores/user";
import { buildValidatorData } from "@/utils/validate";
import { onResetForm } from "@/utils/common";
import { FormInstance, FormRules } from "element-plus";
import { ElNotification } from "element-plus";

const formRef = ref<FormInstance>();
const state = reactive<{
    showModifyBox: boolean;
    form: anyObj;
    buttonLoading: boolean;
    formKey: number;
}>({
    showModifyBox: false,
    form: {},
    buttonLoading: false,
    formKey: Date.now(),
});

// 表单验证规则
const rules = reactive<FormRules>({
    nickname: [buildValidatorData({ name: "required", message: "请输入昵称" }), buildValidatorData({ name: "account" })],
    password: [buildValidatorData({ name: "password" })],
});

const userStore = useUserInfo();

getUserInfo().then(res => {
    state.form.username = res.data.username;
    state.form.nickname = res.data.nickname;
    // 重新渲染表单以记录初始值，更新表单组件时，表单初始值已被赋值
    state.formKey = Date.now();
});

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async valid => {
        if (valid) {
            state.buttonLoading = true;
            const { nickname, password } = state.form;
            modifyUserInfo({ nickname, password })
                .then(res => {
                    userStore.dataFill({ ...userStore.$state, nickname: state.form.nickname });
                    state.buttonLoading = false;
                    ElNotification.success({ title: "操作成功", message: res.msg });
                })
                .catch(() => {
                    state.buttonLoading = false;
                });
        }
    });
};

// 修改头像
const onAvatarBeforeUpload = (file: any) => {
    let fd = new FormData();
    fd.append("file", file.raw);

    fileUpload(fd, "image").then(() => {
        getUserInfo().then(info => {
            userStore.dataFill(info.data);
        });
    });
};
</script>

<style scoped lang="scss">
.user-info {
    height: 100%;
    overflow: hidden;
    background-color: var(--ylt-bg-color-overlay);
    border-radius: var(--el-border-radius-base);

    img {
        width: 100px;
        height: 100px;
        border-radius: 50px 50px;
    }

    .base-info {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        height: 200px;
    }

    .base-info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .nickname {
            font-size: 22px;
            color: var(--el-text-color-primary);
        }

        .create-time {
            font-size: 14px;
            color: var(--el-text-color-regular);
        }

        .avatar {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 3px dashed var(--el-color-primary-light-7);
            cursor: pointer;

            &:hover {
                border-color: var(--el-color-primary);
            }
        }
    }

    .other-info {
        padding: 30px;
    }
}
</style>
