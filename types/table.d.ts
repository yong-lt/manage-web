import { ButtonType, PopconfirmProps, ElForm, ElTable } from "element-plus";
import Table from "@/components/table/index.vue";

declare global {
    interface BaTable {
        ref?: typeof Table;
        rowKey?: string;
        loading?: boolean;
        expandAll?: boolean;
        data?: TableRow[];
        column?: TableColumn[];
        selection?: TableRow[];
    }

    interface BaTableForm {
        ref?: InstanceType<typeof ElForm>;
        loading?: boolean;
        labelWidth?: number;
        items?: anyObj;
        operate?: string;
        title?: string;
        defaultItem?: anyObj;
    }

    /* 表格行 */
    interface TableRow extends anyObj {
        children?: TableRow[];
    }

    interface TableColumn extends ElTableColumn {
        render?: "icon" | "image" | "tag" | "buttons";
        buttons?: OptButton[];
        custom?: anyObj;
    }

    interface BaTableBefore {
        onSubmit?: ({ form, items, filedArr }: { form: InstanceType<typeof ElForm>; items: anyObj; filedArr?: anyObj }) => boolean | void;
        [key: string]: Function | undefined;
    }

    /* 表格右侧操作按钮 */
    interface OptButton {
        // 渲染方式:tipButton=带tip的按钮,confirmButton=带确认框的按钮,moveButton=移动按钮,basicButton=普通按钮
        render: "tipButton" | "confirmButton" | "basicButton";
        name: string;
        title?: string;
        type: ButtonType;
        icon: string;
        popconfirm?: Partial<Mutable<PopconfirmProps>>;
    }

    type HeaderOptButton = "refresh" | "add" | "delete" | "unfold";
}

interface ElTableColumn {
    type?: "selection" | "index" | "expand";
    index?: number | Function;
    label?: string;
    "column-key"?: string;
    prop?: string;
    width?: string | number;
    "min-width"?: string | number;
    fixed?: string | boolean;
    "render-header"?: Function;
    sortable?: string | boolean;
    "sort-method"?: Function;
    "sort-by"?: Function;
    "sort-orders"?: string[] | null[];
    resizable?: boolean;
    formatter?: Function;
    "show-overflow-tooltip"?: boolean;
    align?: "left" | "center" | "right";
    "header-align"?: "left" | "center" | "right";
    "class-name"?: string;
    "label-class-name"?: string;
    selectable?: Function;
    "reserve-selection"?: boolean;
    filters?: { key: string; value: string }[];
    "filter-placement"?: string;
    "filter-multiple"?: boolean;
    "filter-method"?: Function;
    "filtered-value"?: any[];
}

export {};
