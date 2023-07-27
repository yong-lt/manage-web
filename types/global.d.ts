interface UserInfo {
    id: number;
    username: string;
    token: string;
    avatar_url: string;
    create_time: string;
    update_time: string;
    last_login_time: string;
    nickname: string;
}

interface anyObj {
    [key: string]: any;
}

interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}

type ApiPromise<T = any> = Promise<ApiResponse<T>>;
