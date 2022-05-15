<template>
    <tbody class="table-tbody">
        <tr v-for="(row, rowIdx) in list" :key="row.id || rowIdx">
            <tbody-td v-for="(col, colIdx) in columns"
                      :index="rowIdx"
                      :row="row"
                      :col="col"
                      :key="(row.id || rowIdx) + '' + colIdx" />
        </tr>
    </tbody>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { ColumnsTheadType } from "../types";

import { computed, inject, ref } from "vue";

import TbodyTd from "./TbodyTd.vue"; //内容单元格组件

import { TableSort } from "../hooks/useBasicTable";

const props = defineProps({
    columns: {
        type: Array as PropType<ColumnsTheadType[]>,
        default: ()=> []
    },
    data: {
        type: Array as any,
        default: ()=> []
    }
});

const tableSort = inject(TableSort, ref());

const list = computed(() => {
    let data = props.data;

    // 排序
    if (tableSort.value) {
        const field = tableSort.value.field;
        const order = tableSort.value.order;
        const column = props.columns?.find((item) => item.key === field);
        // 对数组的元素进行排序
        data.sort((a: any, b: any) => {
            if (column && typeof column.sorter === "function") {
                return column.sorter(order, a, b);
            }

            let aval = a[field];
            let bval = b[field];

            if (typeof b[field] === "number") {
                aval = aval || 0;
                bval = bval || 0;

                if (order === "ascend") {
                    return aval - bval;
                } else {
                    return bval - aval;
                }
            }
            // 如用的是英语，则是根据字母排序的。如果有用到汉字则是根据汉字拼音来排序
            if (typeof b[field] === "string") {
                aval = aval || "";
                bval = bval || "";

                if (order === "ascend") {
                    return aval.localeCompare(bval);
                } else {
                    return bval.localeCompare(aval);
                }
            }

            return 0;
        });
    }

    return data;
});
</script>

<style lang="less" scoped>
.table-tbody {
    tr {
        transition: all 250ms;
        &:hover {
            background: rgba(60, 90, 100, 0.04);
        }
    }
}
</style>
