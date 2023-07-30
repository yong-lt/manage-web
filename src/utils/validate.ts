import { FormItemRule } from "element-plus";

/**
 * 账户名验证
 */
export function validatorAccount(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback();
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/.test(val)) {
        return callback(new Error("以大小写字母开头且不能有符号, 长度范围为 5 ~ 10"));
    }
    return callback();
}

/**
 * 密码验证
 */
export function validatorPassword(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback();
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/.test(val)) {
        return callback(new Error("以大小写字母开头且不能有符号, 长度范围为 5 ~ 10"));
    }
    return callback();
}

/**
 * 菜单组件路径验证
 */
export function validatorMenuComponentPath(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback();
    }
    if (!/^\/.*index$/.test(val)) {
        return callback(new Error("需要以/开头，index结尾的组件路径"));
    }
    return callback();
}

export interface buildValidatorParams {
    // 规则名:required=必填,mobile=手机号,account=账户,password=密码,menuComponentPath=菜单组件路径
    name: "required" | "account" | "password" | "menuComponentPath";
    // 自定义验证错误消息
    message?: string;
    // 验证触发方式
    trigger?: "change" | "blur";
}

/**
 * 构建表单验证规则
 * @param { buildValidatorParams } 参数对象
 */
export function buildValidatorData({ name, message, trigger = "blur" }: buildValidatorParams): FormItemRule {
    // 必填
    if (name == "required") {
        return {
            required: true,
            message: message,
            trigger: trigger,
        };
    }

    // 自定义验证方法
    const validatorCustomFun: anyObj = {
        account: validatorAccount,
        password: validatorPassword,
        menuComponentPath: validatorMenuComponentPath,
    };
    if (validatorCustomFun[name]) {
        return {
            required: false,
            validator: validatorCustomFun[name],
            trigger: trigger,
            message: message,
        };
    }
    return {};
}
