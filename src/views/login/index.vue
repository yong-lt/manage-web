<template>
    <div @contextmenu.stop="" id="bubble" class="bubble">
        <canvas id="bubble-canvas" class="bubble-canvas"></canvas>
    </div>
    <div class="login">
        <div class="login-box">
            <div class="head">
                <img src="~assets/login-header.png" alt="" />
            </div>
            <div class="form">
                <img v-if="!userInfo.avatar_url" class="profile-avatar" src="~assets/avatar.png" alt="" />
                <img v-else class="profile-avatar" :src="userInfo.avatar_url" alt="" />
                <div class="content">
                    <el-form ref="formRef" :model="form" status-icon :rules="rules" @keyup.enter="onSubmit(formRef)">
                        <el-form-item prop="username">
                            <el-input ref="usernameRef" v-model="form.username" placeholder="用户名" clearable type="text">
                                <template #prefix>
                                    <el-icon><User /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input ref="passwordRef" v-model="form.password" placeholder="密码" type="password" show-password>
                                <template #prefix>
                                    <el-icon><Key /></el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-checkbox v-model="form.remember" label="记住用户名" size="default"></el-checkbox>
                        <el-form-item>
                            <el-button
                                :loading="form.loading"
                                class="submit-button"
                                round
                                type="primary"
                                size="large"
                                @click="onSubmit(formRef)"
                                >登 录</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, reactive, ref } from "vue";
import type { FormInstance, FormRules, ElInput } from "element-plus";
import { useUserInfo } from "@/stores/user";
import { useRouter } from "vue-router";
import { buildValidatorData } from "@/utils/validate";
import * as pageBubble from "@/utils/pageBubble";
import { updateHtmlDarkClass } from "@/utils/useDark";
import { useConfig } from "@/stores/config";

var timer: NodeJS.Timer;

const formRef = ref<FormInstance>();
const usernameRef = ref<InstanceType<typeof ElInput>>();
const passwordRef = ref<InstanceType<typeof ElInput>>();

const form = reactive({
    username: "",
    password: "",
    loading: false,
    remember: false,
});

// 表单验证规则
const rules = reactive<FormRules>({
    username: [buildValidatorData({ name: "required", message: "请输入账号" }), buildValidatorData({ name: "account" })],
    password: [buildValidatorData({ name: "required", message: "请输入密码" }), buildValidatorData({ name: "password" })],
});

const router = useRouter();
const userInfo = useUserInfo();
const configStore = useConfig();

onMounted(() => {
    timer = setTimeout(() => {
        pageBubble.init();
    }, 1000);

    initForm();
    // 读取配置，是否启动暗黑主题
    updateHtmlDarkClass(configStore.getIsDark());
});

onBeforeUnmount(() => {
    clearTimeout(timer);
    pageBubble.removeListeners();
});

const initForm = () => {
    form.username = userInfo.username;
    form.remember = userInfo.remember as boolean;
};

const focusInput = () => {
    if (form.username === "") {
        usernameRef.value!.focus();
    } else if (form.password === "") {
        passwordRef.value!.focus();
    }
};

const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    formEl.validate(async valid => {
        if (valid) {
            form.loading = true;
            try {
                const { username, password, remember } = form;
                await userInfo.login({ username, password, remember });
                router.push("/dashboard");
            } catch (error) {
                form.loading = false;
            }
        } else {
            focusInput();
            return false;
        }
    });
};
</script>

<style scoped lang="scss">
.bubble {
    overflow: hidden;
    background: url(@/assets/bg.jpg) repeat;
}
.login {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        overflow: hidden;
        width: 430px;
        background-color: #fff;
    }

    .head {
        img {
            display: block;
            width: 430px;
            user-select: none;
        }
    }
    .form {
        position: relative;
        .profile-avatar {
            display: block;
            position: absolute;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: 4px solid var(--ylt-bg-color-overlay);
            top: -50px;
            right: calc(50% - 50px);
            z-index: 2;
            user-select: none;
        }
        .content {
            padding: 100px 40px 40px 40px;
            background-color: var(--ylt-bg-color);
        }

        .submit-button {
            width: 100%;
            letter-spacing: 2px;
            font-weight: 300;
            margin-top: 15px;
            --el-button-bg-color: var(--el-color-primary);
        }
    }
}

@media screen and (max-width: 720px) {
    .login-box {
        width: 340px;
        margin-top: 0;
    }
}

@at-root .dark {
    .bubble {
        overflow: hidden;
        background: url(@/assets/bg-dark.jpg) repeat;
    }
    .login-box {
        background: #161b22;
    }
    .head {
        img {
            filter: brightness(60%);
        }
    }
    .form {
        .submit-button {
            --el-button-bg-color: var(--el-color-primary-light-5);
            --el-button-border-color: rgba(240, 252, 241, 0.1);
        }
    }
}
</style>
