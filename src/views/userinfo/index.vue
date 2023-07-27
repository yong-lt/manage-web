<template>
    <div class="container">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <div class="user-info">
                    <div v-show="!showModifyBox" class="base-info">
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { fileUpload } from "@/api/common";
import { useUserInfo } from "@/stores/user";
import { baTableApi } from "@/api/common";
import { Users } from "@/api/controllerUrl";

const showModifyBox = ref(false);

const userStore = useUserInfo();

const onAvatarBeforeUpload = (file: any) => {
    let fd = new FormData();
    fd.append("file", file.raw);

    fileUpload(fd, "image").then(res => {
        new baTableApi(Users).info(userStore.id).then(info => {
            console.log(info);
        });
    });
};
</script>

<style scoped lang="scss">
.user-info {
    height: calc(100vh - 150px);
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
}
</style>
