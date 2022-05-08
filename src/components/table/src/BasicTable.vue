<template>
    <div class="basic-table">
        <div class="table">
            <table class="table-box table-border"
                   ellspacing="0"
                   cellpadding="0"
                   border="0">
                <Thead :columns="columnsThead" />
                <Tbody :columns="ColumnsTbody" :data="data" />
            </table>
        </div>

    <div class="pagination">4555</div>
    </div>
</template>


<script lang="ts" setup>
import type { PropType } from "vue";
import type { ColumnsType, ColumnsTheadType } from "./types";

import { ref, computed, provide, getCurrentInstance } from "vue";

import Thead from "./components/Thead.vue"; //表头组件
import Tbody from "./components/Tbody.vue"; // 表格内容组件

import { TableSort } from "./hooks/useBasicTable"; //排序

provide(TableSort, ref());

const uid = getCurrentInstance()?.uid || Math.floor(Math.random() * 1000000000);

const props = defineProps({
    columns: Array as PropType<ColumnsType[]>,
    data: Array as PropType<unknown[]>,
});

// 处理表头数据为一维数组
const columnsThead = computed<ColumnsTheadType[]>(() => {
    let i = 0;
    const columns = props.columns as ColumnsTheadType[];
    const flatten = (data: ColumnsTheadType[], level = 1, parent?: ColumnsTheadType) =>
        data.reduce((acc: ColumnsTheadType[], v) => {
            i += 1;
            v.classResize = "column-cell-" + uid + "-" + i; //
            v.level = level;
            v.parent = parent;
            acc.push(v);
            if (v.children) {
                acc.push(...flatten(v.children as ColumnsTheadType[], level + 1, v));
            }
            return acc;
        }, []);
    return flatten(columns, 1);
});
// 表格内容数据
const ColumnsTbody = computed<ColumnsTheadType[]>(() =>
    columnsThead.value.filter((item) => !item.children?.length)
);

</script>
<style lang="less" scoped>
.basic-table {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .table {
        height: 100%;
        flex: 1;
        overflow: hidden;
        overflow: auto;
        .table-box {

            &:deep(.table-thead) {
                flex-shrink: 0;
            }

            &:deep(.table-tbody) {
                flex: 1;
                overflow: hidden;
                overflow-y: auto;
                position: relative;
            }
        }
    }

    .pagination {
        flex-shrink: 0;
    }
    .table-border {
        border: 1px solid #eee;
        border-bottom: none;
        border-right: none;

        &:deep(th),
        &:deep(td) {
            border: 1px solid #eee;
            border-top: none;
            border-left: none;
        }
    }
}
</style>
