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

    constructor(api: baTableApi, table: BaTable, before: BaTableBefore = {}) {
        this.api = api;
        this.table = Object.assign(this.table, table);
        this.form = Object.assign(this.form, {});
        this.before = before;
    }

    runBefore(funName: string, args: any = {}) {
        if (this.before && this.before[funName] && typeof this.before[funName] === "function") {
            return this.before[funName]!({ ...args }) === false ? false : true;
        }

        return true;
    }

    // 获取列表数据
    getList() {
        this.table.loading = true;
        this.api
            .list()
            .then(res => (this.table.data = res.data))
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
     * @param operateIds 被操作项的数组:add=[],edit=[1,2,...]
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
        this.api.delete(ids).then(res => this.getList());
    };

    onSubmit(form: InstanceType<typeof ElForm> | undefined = undefined) {
        if (this.runBefore("onSubmit", { form, items: this.form.items }) === false) return;

        if (form) {
            this.form.ref = form;
        }

        this.api.modify(this.form.items).then(res => {
            this.toggleForm();
            this.getList();
        });
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
