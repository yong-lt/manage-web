<template>
    <div class="nav-menus" :class="configStore.layout.layoutMode">
        <div class="nav-menu-item" @click="onGithub">
            <!-- <Icon :color="configStore.getColorVal('headerBarTabColor')" name="FullScreen"></Icon> -->

            <i class="el-icon icon" style="font-size: 24px" :style="{ color: configStore.getColorVal('headerBarTabColor') }">
                <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" height="1.2em" width="1.2em">
                    <path
                        fill="currentColor"
                        d="M 12 2 C 6.475 2 2 6.475 2 12 a 9.994 9.994 0 0 0 6.838 9.488 c 0.5 0.087 0.687 -0.213 0.687 -0.476 c 0 -0.237 -0.013 -1.024 -0.013 -1.862 c -2.512 0.463 -3.162 -0.612 -3.362 -1.175 c -0.113 -0.288 -0.6 -1.175 -1.025 -1.413 c -0.35 -0.187 -0.85 -0.65 -0.013 -0.662 c 0.788 -0.013 1.35 0.725 1.538 1.025 c 0.9 1.512 2.338 1.087 2.912 0.825 c 0.088 -0.65 0.35 -1.087 0.638 -1.337 c -2.225 -0.25 -4.55 -1.113 -4.55 -4.938 c 0 -1.088 0.387 -1.987 1.025 -2.688 c -0.1 -0.25 -0.45 -1.275 0.1 -2.65 c 0 0 0.837 -0.262 2.75 1.026 a 9.28 9.28 0 0 1 2.5 -0.338 c 0.85 0 1.7 0.112 2.5 0.337 c 1.912 -1.3 2.75 -1.024 2.75 -1.024 c 0.55 1.375 0.2 2.4 0.1 2.65 c 0.637 0.7 1.025 1.587 1.025 2.687 c 0 3.838 -2.337 4.688 -4.562 4.938 c 0.362 0.312 0.675 0.912 0.675 1.85 c 0 1.337 -0.013 2.412 -0.013 2.75 c 0 0.262 0.188 0.574 0.688 0.474 A 10.016 10.016 0 0 0 22 12 c 0 -5.525 -4.475 -10 -10 -10 Z"
                    ></path>
                </svg>
            </i>
        </div>
        <div class="nav-menu-item" @click="onFullScreen">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" name="FullScreen"></Icon>
        </div>
        <el-popover :offset="20" trigger="click" placement="bottom-end" :hide-after="0" :width="260">
            <template #reference>
                <div class="admin-info">
                    <el-avatar :size="25" fit="fill">
                        <img :src="userStore.getUserInfo.avatar_url" alt="" />
                    </el-avatar>
                    <div class="admin-name">{{ userStore.getUserInfo.nickname }}</div>
                </div>
            </template>
            <div>
                <div class="admin-info-base">
                    <el-avatar :size="70" fit="fill">
                        <img :src="userStore.getUserInfo.avatar_url" alt="" />
                    </el-avatar>
                    <div class="admin-info-other">
                        <div class="admin-info-name">{{ userStore.getUserInfo.nickname }}</div>
                        <div class="admin-info-lasttime">{{ userStore.getUserInfo.last_login_time }}</div>
                    </div>
                </div>
                <div class="admin-info-footer">
                    <el-button @click="router.push('/userinfo/index')" type="primary" plain>个人资料</el-button>
                    <el-button @click="onLogout" type="danger" plain>注销</el-button>
                </div>
            </div>
        </el-popover>
        <div class="nav-menu-item" @click="configStore.setLayout('showDrawer', true)">
            <Icon :color="configStore.getColorVal('headerBarTabColor')" name="Tools"></Icon>
        </div>
    </div>

    <config />
</template>

<script lang="ts" setup>
import config from "../common/config.vue";
import { useConfig } from "@/stores/config";
import { useUserInfo } from "@/stores/user";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";
import { useRouter } from "vue-router";
import { onLogout } from "@/utils/common";

const configStore = useConfig();
const userStore = useUserInfo();
const router = useRouter();

const onFullScreen = () => {
    if (!screenfull.isEnabled) {
        ElMessage.warning("您的浏览器不支持全屏");
        return false;
    }
    screenfull.toggle();
};

const onGithub = () => {
    window.open("https://github.com/yong-lt");
};
</script>

<style scoped lang="scss">
.nav-menus.Default {
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-light);
}
.nav-menus {
    min-width: 120px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    float: right;
    font-size: 14px;
    background-color: v-bind('configStore.getColorVal("headerBarBackground")');

    .admin-info {
        display: flex;
        height: 100%;
        padding: 0 10px;
        align-items: center;
        cursor: pointer;

        .admin-name {
            padding-left: 10px;
        }
    }

    .nav-menu-item {
        height: 100%;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .nav-menu-icon {
            box-sizing: content-box;
            color: v-bind('configStore.getColorVal("headerBarTabColor")') !important;
        }
        &:hover {
            .icon {
                animation: twinkle 0.3s ease-in-out;
            }
        }
    }

    .admin-info:hover,
    .nav-menu-item:hover {
        background: v-bind('configStore.getColorVal("headerBarHoverBackground")');
    }
}

.admin-info-base {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 10px;
    .admin-info-other {
        display: block;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        .admin-info-name {
            font-size: var(--el-font-size-large);
        }
    }
}
.admin-info-footer {
    padding: 10px 0;
    margin: 0 -12px -12px -12px;
    display: flex;
    justify-content: space-around;
}

@keyframes twinkle {
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
