interface UserInfo {
    id: number;
    username: string;
    token: string;
    avatar_url: string;
    create_time: string;
    update_time: string;
    last_login_time: string;
    nickname: string;
    remember: Boolean;
}

interface anyObj {
    [key: string]: any;
}

interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}
// 文件上传保存位置
type fileUploadSaveSite = "image" | "xlsx" | "doc" | "audio" | "video";

type ApiPromise<T = any> = Promise<ApiResponse<T>>;
