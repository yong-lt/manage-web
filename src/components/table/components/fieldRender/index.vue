<template>
    <Icon class="ba-icon-dark" v-if="field.render == 'icon'" :name="fieldValue" />

    <!-- tag -->
    <div v-if="field.render == 'tag'">
        <el-tag :type="getTagType(fieldValue, field.custom)" effect="dark" size="small">{{ field.custom && field.custom[fieldValue]["name"] }}</el-tag>
    </div>

    <!-- 按钮组 -->
    <div v-if="field.render == 'buttons' && field.buttons">
        <template v-for="btn in field.buttons">
            <el-tooltip v-if="btn.render == 'tipButton'" :content="btn.title" placement="top">
                <el-button v-if="btn.name == 'edit'" :type="btn.type" size="small" class="table-operate" @click="onButtonClick(btn)">
                    <Icon :name="btn.icon" />
                </el-button>
            </el-tooltip>
            <el-popconfirm v-if="btn.render == 'confirmButton'" v-bind="btn.popconfirm" @confirm="onButtonClick(btn)">
                <template #reference>
                    <div class="ml-6">
                        <el-tooltip :content="btn.title" placement="top">
                            <el-button v-if="btn.name == 'delete'" class="table-operate" :type="btn.type">
                                <Icon :name="btn.icon" />
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-popconfirm>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import baTableClass from "@/utils/baTable";

const baTable = inject("baTable") as baTableClass;

interface Props {
    field: TableColumn;
    row: TableRow;
}
const props = defineProps<Props>();

const fieldName = ref(props.field.prop);
const fieldValue = ref(fieldName.value ? props.row[fieldName.value] : "");

const onButtonClick = (btn: OptButton) => {
    baTable.onTableAction(btn.name, btn, props);
};

const getTagType = (value: string, custom: any) => (custom && custom[value]["type"] ? custom[value]["type"] : "");
</script>

<style scoped lang="scss">
.table-operate {
    padding: 4px 5px;
    height: auto;
}
.table-operate .icon {
    font-size: 14px !important;
    color: var(--ylt-bg-color-overlay) !important;
}
.ml-6 {
    display: inline-flex;
    vertical-align: middle;
    margin-left: 6px;
}
</style>
