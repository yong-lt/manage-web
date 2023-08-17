import { baTableApi } from "@/api/common";
import { ElForm } from "element-plus";
import { reactive } from "vue";

export default class baTable {
    public api;

    public table = reactive<BaTable>({
        ref: undefined,
        rowKey: "id",
        loading: false,
        expandAll: false,
        data: [],
        column: [],
        selection: [],
    });

    public form = reactive<BaTableForm>({
        ref: undefined,
        loading: false,
        labelWidth: 160,
        items: {},
        defaultItem: {},
        operate: "",
        title: "",
    });

    public before: BaTableBefore;
    public after: BaTableAfter;

    constructor(api: baTableApi, table: BaTable, form: BaTableForm, before: BaTableBefore = {}, after: BaTableAfter = {}) {
        this.api = api;
        this.table = Object.assign(this.table, table);
        this.form = Object.assign(this.form, form);
        this.before = before;
        this.after = after;
    }

    // 检查是否有组件私有方法
    runBefore(funName: string, args: anyObj = {}) {
        if (this.before && this.before[funName] && typeof this.before[funName] === "function") {
            return this.before[funName]!({ ...args }) === false ? false : true;
        }

        return true;
    }

    // 检查是否有组件私有方法
    runAfter(funName: string, args: anyObj = {}) {
        if (this.after && this.after[funName] && typeof this.after[funName] === "function") {
            return this.after[funName]!({ ...args }) === false ? false : true;
        }

        return true;
    }

    // 获取列表数据
    getList() {
        this.table.loading = true;
        this.api
            .list()
            .then(res => {
                this.table.data = res.data;
                this.runAfter("getIndex", { res });
            })
            .finally(() => (this.table.loading = false));
    }

    // 响应事件
    onTableAction(event: string, btn: OptButton | undefined, data: anyObj) {
        const actionFun = new Map([
            [
                "edit",
                () => {
                    this.toggleForm("edit", btn, data.row[this.table.rowKey!]);
                },
            ],
            [
                "delete",
                () => {
                    this.postDel([data.row[this.table.rowKey!]]);
                },
            ],
            [
                "selection-change",
                () => {
                    this.table.selection = data as TableRow[];
                },
            ],
            [
                "default",
                () => {
                    console.warn("响应事件未定义");
                },
            ],
        ]);
        const action = actionFun.get(event) || actionFun.get("default");
        action!.call(this);
    }

    onTableHeaderAction = (event: string, data: anyObj) => {
        const actionFun = new Map([
            [
                "refresh",
                () => {
                    this.table.data = [];
                    // 菜单，暂时这样传参数
                    this.getList();
                },
            ],
            [
                "add",
                () => {
                    this.toggleForm("add", data);
                },
            ],
            [
                "delete",
                () => {
                    this.postDel(this.getSelectionIds());
                },
            ],
            [
                "unfold",
                () => {
                    this.table.expandAll = data.unfold;
                    if (this.table.ref) {
                        this.table.ref.unFoldAll(data.unfold);
                    }
                },
            ],
            [
                "default",
                () => {
                    console.warn("响应事件未定义");
                },
            ],
        ]);

        const action = actionFun.get(event) || actionFun.get("default");
        action!.call(this);
    };

    /**
     * 打开表单
     * @param operate 操作:add=添加,edit=编辑
     */
    toggleForm = (operate = "", btn: OptButton | anyObj = {}, id: number = 0) => {
        if (this.form.ref) {
            this.form.ref.resetFields();
        }

        if (operate === "edit") {
            this.requestEdit(id);
        } else if (operate === "add") {
            this.form.items = Object.assign({}, this.form.defaultItem);
        }

        if (typeof operate !== "string") {
            operate = "";
        }

        this.form.operate = operate;
        this.form.title = btn?.title || "";
    };

    requestEdit(id: number) {
        this.form.loading = true;
        this.form.items = {};
        this.api.info(id).then(res => {
            this.form.items = res.data;
            this.form.loading = false;
        });
    }

    // 删除
    postDel = (ids: string[]) => {
        this.api.delete(ids).then(() => this.getList());
    };

    onSubmit(form: InstanceType<typeof ElForm> | undefined = undefined, filedArr?: string[]) {
        if (this.runBefore("onSubmit", { form, items: this.form.items, filedArr }) === false) return;

        const submitCallback = () => {
            if (!this.form.items?.id) {
                this.api.add(this.form.items).then(() => {
                    this.onTableHeaderAction("refresh", {});
                    this.toggleForm();
                });
            } else {
                for (const key in this.form.items) {
                    if (filedArr && !filedArr.includes(key)) {
                        delete this.form.items[key];
                    }
                }
                this.api.modify(this.form.items).then(() => {
                    this.onTableHeaderAction("refresh", {});
                    this.toggleForm();
                });
            }
        };

        if (form) {
            this.form.ref = form;
            form.validate(valid => {
                if (valid) {
                    submitCallback();
                }
            });
        } else {
            submitCallback();
        }
    }
    /**
     * 获取表格选择项的id数组
     */
    getSelectionIds() {
        const ids: string[] = [];
        this.table.selection?.forEach(item => {
            ids.push(item[this.table.rowKey!]);
        });
        return ids;
    }
    // 表单初始化请求数据
    mount() {
        this.getList();
    }
}
