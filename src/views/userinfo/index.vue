<template>
    <div class="container">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <div class="user-info">
                    <div v-if="showModifyBox" class="box-1">
                        <div class="avatar-choose-btn">
                            <div class="content">
                                <el-icon><Icon color="#99a2aa" name="Picture" /></el-icon>
                                <span>选择文件</span>
                            </div>
                            <input type="file" name="" id="" ref="FileRef" />
                        </div>
                        <img :src="avatarSrc" alt="" />
                    </div>

                    <div v-else class="box-2">
                        <img :src="userStore.getUserInfo.avatar_url" alt="" @click="onClickAvatar" />
                        <div class="nickname">{{ userStore.getUserInfo.nickname }}</div>
                        <div class="create-time">最后登录：{{ userStore.getUserInfo.last_login_time }}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { UploadRawFile } from "element-plus";
import { onMounted, ref } from "vue";
import { useUserInfo } from "@/stores/user";

const FileRef = ref<HTMLInputElement>();
const avatarSrc = ref("");
const showModifyBox = ref(false);

const userStore = useUserInfo();

onMounted(() => {
    if (FileRef.value) {
        FileRef.value.onchange = e => {
            if (e.target) {
                const file = (e.target as HTMLInputElement).files![0];
                const reader = new FileReader();
                reader.onload = () => {
                    console.log(reader.result);

                    avatarSrc.value = reader.result as string;
                };
                reader.readAsDataURL(file);
            }
        };
    }
});

const onClickAvatar = () => (showModifyBox.value = true);
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

    .box-1,
    .box-2 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        height: 200px;
    }

    .box-1 {
        .avatar-choose-btn {
            width: 120px;
            height: 50px;
            position: relative;
            background-color: #f1f2f5;
            border: 1px solid #e5e9ef;
            line-height: 50px;
            border-radius: 5px;
            color: #5a6267;
            margin-right: 50px;

            .content {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            }

            input {
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
                left: 0;
                top: 0;
                z-index: 999;
            }
        }
    }

    .box-2 {
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

        img {
            border: 3px dashed var(--el-color-primary-light-7);
            cursor: pointer;

            &:hover {
                border-color: var(--el-color-primary);
            }
        }
    }
}
</style>
